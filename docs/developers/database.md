# Database

DB 함수

## DB 연결
### sql_connect($host, $user, $pass, $db=G5_MYSQL_DB)
### sql_select_db($db, $connect)
### sql_set_charset($charset, $link=null)
### sql_data_seek($result, $offset=0)

## 질의 및 결과
### sql_query($sql, $error=G5_DISPLAY_SQL_ERROR, $link=null)
### sql_fetch($sql, $error=G5_DISPLAY_SQL_ERROR, $link=null)
### sql_fetch_array($result)

## 기타
### sql_free_result($result)
### sql_password($value)
### sql_insert_id($link=null)
### sql_num_rows($result)
### sql_field_names($table, $link=null)
### sql_error_info($link=null)
### sql_real_escape_string($str, $link=null)
