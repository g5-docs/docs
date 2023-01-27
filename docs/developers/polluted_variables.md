# 오염된 글로벌 변수

그누보드에서는 전송받은 요청을 글로벌 변수로 모두 풀어놓는 방식을 사용한다.

이로인해 글로벌 변수가 오염된다. 그누보드 배포본은 물론 테마나 스킨, 플러그인 및 그누보드와 연동되는 모든 영역에서 오염된 글로벌 변수로 인해 위험에 노출되어있다.

```php
@extract($_GET); // [!code error]
@extract($_POST); // [!code error]
@extract($_SERVER); // [!code error]
```

PHP 매뉴얼에서는 [`extract()`](https://www.php.net/manual/en/function.extract.php) 함수로 `$_GET`, `$_FILES` 등의 사용자 입력 값처럼 신뢰할 수 없는(외부로부터 수신한) 데이터에 사용하지 말라고 경고한다.

> Warning Do not use extract() on untrusted data, like user input (e.g. $\_GET, $\_FILES).

::: details extract & register_globals
`extract()` 함수를 이용해 `register_globals = on`과 같은 PHP 설정과 비슷한 효과를 내주며 편의를 위해 사용했던 방법이지만 디버깅을 어렵게하고 보안에 좋지 않다. `register_globals` 옵션은 2012년 출시한 PHP 5.4.0 버전에서 완전히 제거됐다.

[PHP Right Way](https://modernpug.github.io/php-the-right-way/#register_globals)에서도 만약 PHP 5.4 미만의 버전을 사용하고 있다면 보안 이슈에 노출될 수 있으니 이 옵션을 켜지 말 것을 경고한다.

Wordpress에서도 2012년부터 일부에서 사용된 `extract()` 함수를 코드에서 모두 제거했고, [Wordpress 코딩 표준](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/#dont-extract)에서는 "디버깅을 어렵게 만드는 끔찍한 기능"이라고 말하며 사용하지 말 것을 경고한다

그누보드는 이러한 경고와는 반대로 가장 끔찍한 방법으로 사용해버렸다.
:::

스킨이나 플러그인 등 모든 곳에서 변수의 이름이 겹치지 않도록 주의해야 한다. 그누보드에서 초기화하는 변수 외에도 게시판, 아웃로그인, 최근게시물 등의 스킨에서 보편적으로 사용하는 변수명을 사용한다면 발견하기 어려운 문제를 겪을 수 있다.

### 문제의 예시

글로벌 변수의 오염으로 발생할 수 있는 문제의 예시이다.

```php
if (!$foo) { // 어떠한 특정한 조건
    $link = '/bbs/board.php?bo_table=free';
}
echo '<a href="' . $link . '">돌아가기</a>'; // 골로 갈 수 있다
```

이와 같이 `if` 조건문 안에서만 초기화된 변수는 `http://.../?foo=1&href=hack_code` 같은 방법으로 `$href` 변수에 `hack_code` 값이 할당되어 공격에 이용될 수 있다.

먼저 실행된 스킨에서 `$foo` 또는 `$link` 변수에 값을 할당했다면 의도와 다르게 동작할 수 있다. 모든 곳에서 격리되지 않고 글로벌 변수로 정의되고 사용되기 때문이다.

::: warning
물론 그누보드에서 `$_POST`, `$_GET`, `$_COOKIE`, `$_REQUEST` 변수에 담긴 모든 요청 값에 따옴표 등의 문자에 백슬래시(`\`)를 추가하는 등의 방법을 사용한다. 하지만 변수의 값을 출력하는 HTML 또는 JS 코드 위치에 따라 의도하지 않았더라도 로직을 거치면서 안전하지않은 상태로 변조되었거나 사용될 수 있다. 그누보드에서 처리해주는 것만을 신뢰해서는 안 되며, 변수를 사용하는 방법에 따라 적절히 가공 후 사용해야 한다.
:::

::: warning
변수를 사용할 때는 반드시 먼저 초기화 후에 사용하자. 기본이다.
사용자 입력 값은 적절한 타입으로 변경하고, 문자열은 적절한 처리를 거쳐야 한다.
:::

### 그누보드에서 초기화하는 변수들

그누보드에서 초기화하고 DB에서 가져온 데이터를 담고 있는 $wr_id, $bo_table, $member 등의 변수는 그대로 사용해야겠지만, 사용하려는 변수가 위 사례처럼 특정 조건에서만 초기화된 것은 아닌지 반드시 사용하고 사용해야 한다.

그누보드에서 주요하게 사용되고 초기화 해주는 변수는 `/common.php` 파일에서 찾아볼 수 있으며, `/bbs/board.php` 등에서 게시판 스킨에서 사용될 변수를 초기화하고 있으므로 확인해 보고 사용해야 한다.

```php
array $g5_path // 서버내 절대 경로와 URL
array $config // 환경설정 값
array $member // 로그인한 회원 정보
array $board // 게시판 페이지라면 해당 게시판의 설정
array $group // 게시판 페이지라면 해당 게시판이 속한 그룹 정보
array $g5
array $qaconfig
string $qstr
string $sca
string $sfl
string $stx
string $sst
string $sod
string $sop
string $spt
int|string $page
string $w
int $wr_id
string $bo_table
string $url
string $urlencode
string $gr_id
array $write
string $write_table
bool $is_member
string $is_admin
bool $is_guest
bool $is_mobile
string $board_skin_path // 게시판 스킨의 경로
string $board_skin_url // 게시판 스킨의 URL
string $member_skin_path // 회원 스킨의 경로
string $member_skin_url // 회원 스킨의 URL
string $new_skin_path
string $new_skin_url
string $search_skin_path
string $search_skin_url
string $connect_skin_path
string $connect_skin_url
string $faq_skin_path
string $faq_skin_url
```

### 위험에서 벗어나기

사용자 입력 값을 `$_GET`, `$_POST` 대신에 풀어헤쳐진 글로벌 변수에서 가져오지 않도록 한다. 코드 실행 중간에 다른 용도로 사용되었거나 변조되었을 수 있다. `$_GET`, `$_POST` 값을 사용하고 검증한 후 사용해야한다.

Javascript에서 자주보이는 IIFE 방식을 이용할 수 있다. 함수나 클래스를 정의해 사용할 수도 있지만 조금 더 간편하게 사용할 수 있는 방법이다. PHP 7.0부터 이와 같은 방식으로 글로벌 변수 오염에서 벗어날 수 있다.

```php
(function() {
    // $href 변수를 초기화하는 걸 까먹었다!
    if ($href) {
        // 출력되지 않으며 extract()로 인한 위험에서도 벗어날 수 있다
        echo '<a href="' . $href . '">목록보기</a>';
    }
})();
```

안전하다고 판단되는 글로벌 변수를 골라 가져올 수도 있다.

```php
(function(?int $articleId = 0) {
    echo '글 번호: ' . $articleId;
    echo '$wr_id: ' . $wr_id; // $wr_id 변수의 값은 출력되지 않는다
})($wr_id);
```

## 그누보드에서 제공하는 함수

TBD

### htmlspecialchars2()

### clean_xss_tags()
