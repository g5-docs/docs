# Hook

그누보드5는 기능 확장 방법으로 Hook을 지원한다.

이벤트 시점에 동작을 실행시킬 수 있는 Event와 전달받은 값을 가공해서 돌려주면 데이터를 교체하는 Replace 두 가지 유형을 제공한다.
Event/Replace Hook의 사용법은 같고 Replace가 반환한 값으로 교체하여 반영해주느냐의 차이가 있다.

::: tip
Event와 Replace 목록은 별도로 제공하지 않으며 그누보드 전체 파일에서 `run_event`와 `run_replace`로 검색해서 찾아볼 수 있다.
:::

::: details 그누보드 5.4 버전 이상에서만 지원
Hook 기능은 2019년에 배포된 그누보드 5.4 버전부터 지원하며, 그 이전 버전에서는 Hook을 사용할 수 없다.

5.4 이후 버전이라도 사용하려는 Hook Tag가 추가된 버전을 확인해야한다.
:::

## Hook 사용하기

Hook이 동작될 때 실행될 함수(Listener, 콜백 함수)를 등록해두고 해당 이벤트가 발생할 때 등록한 함수를 호출하여 실행한다.

Hook 유형에 따라 `add_event()`와 `add_replace()` 두 가지 함수를 사용하고, `add_replace()`는 반환하는 값이 결과에 반영된다는 것 외에는 같다.

```php
# Evnet Hook에 리스너 등록
add_event(string $tag, callable $callback, int $priority = G5_HOOK_DEFAULT_PRIORITY, int $args = 0): void;

# Replace Hook에 리스너 등록
add_replace(string $tag, callable $callback, int $priority = G5_HOOK_DEFAULT_PRIORITY, int $args = 0): ?true;
```

### 함수를 리스너로 등록

```php
// 두 번째 인자에 실행할 함수명을 문자열로 지정
add_event('common_header', 'listenerCommonHeader');
function listenerCommonHeader()
{
    // ... 실행할 코드
}
```

### 메소드를 리스너로 등록

메소드를 리스너로 등록할 때는 해당 Class가 `getInstance()` 정적 메소드(static)를 포함해야한다.

::: details getInstance()
보통 Singleton 클래스를 작성하는 방법으로 `getInstance` 이름을 사용하여 클래스 자신의 인스턴스를 반환한다.
:::

```php{1,16-20}
add_replace('board_content_head', [MyHookListenerClass::class, 'listenerBoardContentHead'], G5_HOOK_DEFAULT_PRIORITY, 1);

class MyHookListenerClass
{
    protected self $instance;

    public function getInstance()
    {
        if (!static::$instance) {
            static::$instance = new static();
        }

        return static::$instance;
    }

    # 실행될 메소드
    public function listenerBoardContentHead()
    {
        // ... 실행할 코드
    }
}
```
::: warning
리스너로 등록하려는 클래스는 Hook이 실행될 때 마다 `getInstance()` 메소드를 실행시키고 인스턴스를 반환 받는다.

기존 클래스에 메소드를 추가해서 리스너로 등록할 때 다중 인스턴스로 인한 사이드 이펙트에 주의해야하며, 가능하다면 Hook 리스너를 위한 개별 클래스를 따로 두는 것도 좋다.
:::

::: details 콜백으로 지정가능한 제한된 방법
두번째 인자의 callback은 제한된 callable 타입을 지원한다.
PHP버전에 따라 지원하는 문법 차이도 있다(`className::class`).

가능한 방법
```php
 // 함수
'myListenerMethod'

// 메소드
[MyHookListenerClass::class, 'method']
['MyHookListenerClass', 'method']
[Namespace\MyHookListenerClass::class, 'method']
['Namespace\MyHookListenerClass', 'method']

// 클래스만 지정하면 클래스 인스턴스를 생성한다.
// 생성자에서 기능을 구현하면되지만 생성자에서는 Replace Hook에서 필요한 값을 반환할 수 없다.
Namespace\MyHookListenerClass::class 또는 'Namespace\MyHookListenerClass'
```

지원되지않는 방법
```php
// 익명함수나 arrow-function도 지원하지 않는다
// 생성된 인스턴스는 Hook을 호출하지 못한다
[new Namespace\MyHookListenerClass(), 'method']
```
:::

## Hook 추가

- run_event()
- run_replace()
- delete_event()
- delete_replace()
- get_hook_datas()
