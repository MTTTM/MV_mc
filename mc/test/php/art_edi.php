<?PHP

require_once('connect.php');

$username=htmlspecialchars($_POST['username']);//用户名
 $title=htmlspecialchars($_POST['title']);
$content = htmlspecialchars($_POST['content']);//内容
$type = htmlspecialchars($_POST['type']);//类别
$createtime=time();//时间
if(strlen($title)>60){
        exit('{"message":"添加失败,标题长度不能大于60","status":"0"}');
    }
    if(strlen($content)<60){
        exit('{"message":"添加失败,内容长度不能小于60","status":"0"}');
    }
$sql = "insert into blog(username,title,content,time,type) values('$username','$title','$content','$createtime','$type')";
$query = mysql_query($sql);
if($query){
    echo '{"message":"提交成功","status":"1"}';
}
else{
    echo '{"message":"添加失败","status":"0"}';
}
?>