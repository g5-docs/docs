# 그누보드 보안

TBD

## SQL Injection

SQL Injection 공격은 흔하고 자주 발생하는 문제이다. 그누보드 취약점의 많은 부분이 SQL Injection으로 발생하고 여전히 이 문제로 자주 취약점 패치가 이뤄지고있다. 사용자의 입력 값 등 요청으로 받은 데이터가 안전한지 검증하지않아 발생하는 문제이다.

## 오염된 글로벌 변수: extract()

그누보드에서는 전송받은 요청을 글로벌 변수로 모두 풀어놓는 방식을 사용한다.

이로인해 글로벌 변수가 오염된다. 그누보드 배포본은 물론 테마나 스킨 등 모든 사용처에서 모든 변수가 위험에 노출되어있다. 또한, 글로벌 스코프에 노출되어 다양한 스킨이 동작하면서 변수가 완전히 다른 값으로 대체되었을 수 있다.

::: details register_globals
`register_globals = on`과 같은 PHP 설정과 비슷한 효과를 내주며 편의를 위해 사용했던 방법이지만 보안에는 좋지 않다. PHP 5.4 버전에서 완전히 제거된 옵션이다.
:::

```php
@extract($_GET);
@extract($_POST);
@extract($_SERVER);
```

PHP 매뉴얼에서는 `$_GET`, `$_FILES` 등의 사용자 입력 값처럼 외부로부터 전송받는 데이터를 `extract()` 함수로 이용하지 말라고 경고한다.

> Warning Do not use extract() on untrusted data, like user input (e.g. $\_GET, $\_FILES).

::: details extract
`extract()` 함수 자체는 유용하게 사용될 수 있지만 안전하지않은 변수를 풀어놓아 문제를 만든 것이다. 그럼에도 extract() 대신 [`list()`](https://www.php.net/manual/en/function.list.php)를 대신 사용하자.
:::

```php
if (!$href) {
    $href = '/list';
}
<a href="<?php echo $href ?>">목록보기</a>
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

그누보드에 주요하게 사용하는 변수는 `/common.php` 파일에서 찾아볼 수 있으며, `/bbs/board.php` 등에서 게시판 스킨에서 사용될 변수를 초기화하고 있으므로 확인해 보는 것이 좋다.

::: details 오염된 변수의 위험에서 벗어나기
Javascript에서 자주보이는 IIFE처럼 PHP 7 이상에서는 클로저를 이용한 방법으로 스코프를 제한하여 글로벌 변수 오염에서 안전할 수 있다.

```php
(function() {
    // $href 변수를 초기화하는 걸 까먹었다!
    if ($href) {
        // 출력되지 않으며 extract()로 인한 위험에서도 벗어날 수 있다
        echo '<a href="' . $href . '">목록보기</a>';
    }
})();
```

물론 스킨에서는 HTML과 뒤섞여있기 때문에 이런 방법을 사용하기는 쉽지 않다.

안전하다고 판단되는 글로벌 변수를 가져올 수도 있다

```php
(function() {
    echo $bo_table;
})($bo_table);
```

:::

## 그누보드에서 제공하는 함수

### htmlspecialchars2()

### clean_xss_tags()
