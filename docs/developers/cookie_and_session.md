# 쿠키 및 세션

TBD

##

### set_cookie

```php
/**
 * @param string $cookie_name
 * @param string $value
 * @param string $expire
 * @param string $path
 * @param string $domain
 * @param bool $secure
 * @param bool $httponly
 * @return void
 */
function set_cookie($cookie_name, $value, $expire, $path = '/', $domain = G5_COOKIE_DOMAIN, $secure = false, $httponly = true);
```

### get_cookie

```php
/**
 * @param string $cookie_name
 * @return string
 */
function get_cookie($cookie_name);
```

### set_session

```php
/**
 * @param string $session_name
 * @param string $value
 * @return void
 */
function set_session($session_name, $value);
```

### get_session

```php
/**
 * @param string $session_name
 * @return string
 */
function get_session($session_name);
```
