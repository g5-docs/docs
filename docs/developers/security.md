# 그누보드 보안

## SQL Injection

SQL Injection 공격은 흔하고 자주 발생하는 문제이다. 그누보드 취약점의 많은 부분이 SQL Injection으로 발생하고 여전히 이 문제로 자주 취약점 패치가 이뤄지고있다. 사용자의 입력 값 등 요청으로 받은 데이터가 안전한지 검증하지않아 발생하는 문제이다.

(작성 중)

## 오염된 글로벌 변수

그누보드에서는 전송받은 요청을 글로벌 변수로 모두 풀어놓는 방식을 사용한다.

이로인해 글로벌 변수가 오염된다. 그누보드 배포본은 물론 테마나 스킨 등 모든 글로벌 변수가 위험에 노출되어있다.

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

그누보드는 이러한 경고와는 반대로 가장 끔찍한 방법을 사용해버렸다.
:::

글로벌 변수의 오염으로 발생할 수 있는 문제의 예시이다.

```php
if (!$href) {
    $href = '/bbs/board.php?bo_table=free';
}
echo '<a href="' . $href . '">목록보기</a>';
```

이와 같이 `if` 조건문 안에서만 초기화된 변수는 `http://.../bbs.php?href=hack_code` 같은 방법으로 `$href` 변수에 `hack_code`를 값으로 받아 공격에 이용될 수 있다.

::: info
물론 그누보드에서 `$_POST`, `$_GET`, `$_COOKIE`, `$_REQUEST` 변수에 담긴 모든 요청 값에 따옴표(`"`) 등의 문자에 백슬래시(`\`)를 추가하는 등의 방법을 사용한다. 하지만 이를 변수를 출력하는 곳이나 의도하지 않았더라도 로직을 거치면서 안전하지않은 상태로 변환되었을 수 있다.

[`htmlspecialchars()`](https://www.php.net/manual/en/function.htmlspecialchars), [`htmlentities()`](https://www.php.net/manual/en/function.htmlentities.php) 함수로 처리 후 사용하는 게 안전하다.
:::

::: warning
변수를 사용할 때는 반드시 먼저 초기화 후에 사용해야한다.
:::

그누보드에서 초기화하고 DB에서 가져온 데이터를 담고 있는 $wr_id, $bo_table, $member 등의 변수는 그대로 사용해야겠지만, 사용하려는 변수가 위 사례처럼 특정 조건에서만 초기화된 것은 아닌지 반드시 사용하고 사용해야 한다.

그누보드에서 주요하게 사용되고 초기화 해주는 변수는 `/common.php` 파일에서 찾아볼 수 있으며, `/bbs/board.php` 등에서 게시판 스킨에서 사용될 변수를 초기화하고 있으므로 확인해 보는 것이 좋다.

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

### 그누보드에서 초기화하는 주요 변수

(작성 중)

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
string $board_skin_path
string $board_skin_url
string $member_skin_path
string $member_skin_url
string $new_skin_path
string $new_skin_url
string $search_skin_path
string $search_skin_url
string $connect_skin_path
string $connect_skin_url
string $faq_skin_path
string $faq_skin_url
```

## 그누보드에서 제공하는 함수

TBD

### htmlspecialchars2()

### clean_xss_tags()
