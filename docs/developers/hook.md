# Hook

[[toc]]

그누보드5는 기능 확장 방법으로 Hook을 지원한다.

코드가 실행되는 중에 끼어들어 추가 동작을 실행하거나 값을 변경해주는 역할을 한다. **Envent**와 **Replace** 두 가지 유형을 제공하고 둘의 방식은 같지만 Replace는 인자로 전달받은 값을 가공해서 반환하면 이후 동작에 반영된다.

Hook은 고유한 이름이 있으며 Hook `Tag`로 부른다.

::: tip
Hook 목록은 따로 제공하지 않으며 그누보드 전체 파일에서 `run_event`와 `run_replace`를 검색해서 찾아볼 수 있다.
:::

::: details 그누보드 5.4 버전 이상에서만 지원
Hook 기능은 2019년에 배포된 그누보드 5.4 버전부터 지원하며 이전 버전에서는 Hook을 사용할 수 없다.

그누보드 5.4 이후 버전이라도 사용하려는 Hook Tag가 추가되지 않은 버전일 수 있다.
:::

## Hook 사용하기 (리스너 등록)

Hook이 동작할 때 실행될 함수(콜백, Listener)를 등록해두면 해당 이벤트가 발생할 때 등록한 함수를 호출하여 실행한다.

Hook 유형에 따라 `add_event()`와 `add_replace()` 두 가지 함수를 사용하고, `add_replace()`는 반환하는 값이 결과에 반영된다는 것 외에는 같다.

```php
# Evnet Hook에 리스너 등록
/**
 * @param string $tag Hook 이름
 * @param callable $callback 실행될 함수, 메소드, 클래스
 * @param int $priority 실행 우선 순위
 *            기본 값인 G5_HOOK_DEFAULT_PRIORITY는 int(8)이다
 * @param int $args 콜백에 전달될 인자의 갯수
 * @return void;
 */
add_event($tag, $callback, $priority = G5_HOOK_DEFAULT_PRIORITY, $args = 0): void;

# Replace Hook에 리스너 등록
add_replace($tag, $callback, $priority = G5_HOOK_DEFAULT_PRIORITY, $args = 0): ?true;
```

### 함수를 리스너로 등록

```php
# 두 번째 인자에 실행할 함수명을 문자열로 지정
add_event('common_header', 'listenerCommonHeader');
function listenerCommonHeader()
{
    // ... 실행할 코드
    // Event Hook은 결과를 반환하지 않아도 된다
}
```

### 메소드를 리스너로 등록

메소드를 리스너로 등록할 때는 해당 메소드가 포함된 Class가 `getInstance()` 정적 메소드(static)를 포함해야한다. Hook은 `getInstance()`를 실행하여 객체를 반환받아 지정한 메소드를 실행한다.

::: details getInstance()
보통 Singleton 클래스를 작성하는 방법으로 `getInstance` 이름을 사용하여 클래스 자신의 인스턴스를 생성하여 반환해야한다.
:::

```php{1-6,21-26}
add_replace(
    'board_content_head',
    array(MyHookListenerClass::class, 'listenerBoardContentHead'),
    G5_HOOK_DEFAULT_PRIORITY,
    1
);

class MyHookListenerClass
{
    private self $instance;

    public static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    # 실행될 메소드
    public function listenerBoardContentHead($arg1)
    {
        // ... 실행할 코드
        return $arg1;
    }
}
```

::: warning
리스너로 등록하려는 메소드의 클래스는 Hook이 동작될 때 마다 `getInstance()` static 메소드를 호출한다.

기존 클래스에 메소드를 추가해서 리스너로 등록할 때 다중 인스턴스로 인한 사이드 이펙트에 주의해야하며, Hook 리스너를 모아둔 개별 클래스를 따로 두는 것도 좋다.
:::

### 클래스 생성자를 리스너로 등록

TBD
인스턴스가 생성됨. replace hook 사용에는 적절하지 않음.

## Hook 추가

TBD

- run_event()
- run_replace()

## 기타

TBD

- delete_event()
- delete_replace()
