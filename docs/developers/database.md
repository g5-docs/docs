# Database

DB를 쉽게 사용하기위한 헬퍼 함수들이 제공된다.

::: danger
TBD. SQL Injection
:::

::: details MySQL & MySQLi
이 헬퍼 함수들은 mysql, mysqli 인터페이스를 동시에 지원하지만 이 가이드에서는 MySQLi만 다룬다.
:::

## 질의 및 결과

### sql_query()

```php
/**
 * @param string $sql 질의문
 * @param bool $error 오류 표시 여부
 * @param ?mysqli $link MySQLi 객체
 * @return mixed|mysqli_result
 */
function sql_query($sql, $error = G5_DISPLAY_SQL_ERROR, $link = null);
```

### sql_fetch()

```php
/**
 * @param string $sql 질의문
 * @param bool $error 오류 표시 여부
 * @param ?mysqli $link MySQLi 객체
 * @return mixed
 */
function sql_fetch($sql, $error = G5_DISPLAY_SQL_ERROR, $link = null);
```

### sql_fetch_array()

```php
/**
 * @param mysqli_result $result
 * @return mixed
 */
function sql_fetch_array($result);
```

### sql_data_seek()

```php
/**
 * @param mysqli_result $result
 * @param int $offset
 */
function sql_data_seek($result, $offset = 0);
```

### sql_free_result()

```php
/**
 * @param mysqli_result $result
 */
function sql_free_result($result);
```

### sql_insert_id()

```php
/**
 * @param ?mysqli $link
 */
function sql_insert_id($link = null);
```

### sql_num_rows()

```php
/**
 * @param mysqli_result $result
 */
function sql_num_rows($result);
```

## DB 연결

### sql_connect()

```php
/**
 * @param string $host
 * @param string $user
 * @param string $pass
 * @param string $db
 */
function sql_connect($host, $user, $pass, $db = G5_MYSQL_DB);
```

### sql_select_db()

```php
/**
 * @param string $db
 * @param mysqli $connect
 */
function sql_select_db($db, $connect);
```

### sql_set_charset()

```php
/**
 * @param string $charset
 * @param ?mysqli $link
 */
function sql_set_charset($charset, $link=null);
```

## 기타

### sql_password()

```php
/**
 * @param string $value
 * @return string
 */
function sql_password($value);
```

### sql_field_names()

```php
/**
 * @param string $table
 * @param ?mysqli $link
 */
function sql_field_names($table, $link = null);
```

### sql_error_info()

```php
/**
 * @param ?mysqli $link
 */
function sql_error_info($link = null);
```

### sql_real_escape_string()

```php
/**
 * @param string $str
 * @param ?mysqli $link
 */
function sql_real_escape_string($str, $link = null);
```
