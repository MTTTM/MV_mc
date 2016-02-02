<?php
require_once('connect.php');
session_start();
 $username= $_POST['username'];
$password=trim($_POST['password']);
$sql = "select * from reg WHERE username='$username' and password='$password'";
$query = mysql_query($sql) or die("查询错误:"+mysql_error());
if( mysql_fetch_array($query) ){
    $_SESSION['username']=$username;
       echo(json_encode(array("data"=>"1","status"=>1)));
  }
  else{
     echo(json_encode(array("data"=>"1","status"=>0)));
  }
?>