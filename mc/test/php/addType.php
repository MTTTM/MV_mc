<?php
require_once('connect.php');
$type=htmlspecialchars($_POST['type']);//新分类
$sql = "insert into type(type) values('$type')";
 $query = mysql_query($sql);
   if($query){
       echo '{"message":"新建分类成功","status":"1"}';
   }
   else{
       echo '{"message":"新建分类失败","status":"0"}';
   }