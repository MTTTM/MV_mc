<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<form action="" method="get">
    <input type="text" value="0" name="page"/>
    <input type="text"  value="1" name="artTypeId"/>
    <input type="text"  value="2" name="pageSize"/>
    <button type="submit"> 提交</button>
</form>
<?php
require_once('php/connect.php');
$page = $_POST['page'];
$pageSize = $_POST['pageSize'];
$maxPage = $_POST['maxPage'];
$totle = $_POST['totle'];

$type = $_POST['artTypeId'];
$username = $_POST['username'];
//// 确定当前页数 $p 参数
$p = $page>0?$page:1;
// 数据指针
$offset = 0*$pageSize;
$sql = "select * from blog where type=$type ";
$query = mysql_query($sql) or die("留言查询错误:"+mysql_error());
$count_result = mysql_query("select count(*) from blog where type=$type");
$count_array = mysql_fetch_array($count_result);
$totle=$count_array['count(*)'];
$maxPage=$totle>0?ceil($totle/$pageSize):0;

if( $query && mysql_num_rows($query) ){
    while($row = mysql_fetch_assoc($query)){
        $time=$row['time'];
        $type=$row['type'];
        $content=htmlspecialchars_decode($row['content']);
        $title=htmlspecialchars_decode($row['title']);
        $id=htmlspecialchars_decode($row['id']);
        $data[] = array("content"=>$content,"title"=>$title,"time"=>$time,"type"=>$type,"id"=>$id);
        //$data[] = $row;
    };
    $cnm=$data;
    // echo json_encode("{\"page\":{\"type\":$type,\"maxPage\":$maxPage,\"page\":$page,\"pageSize\":$pageSize,\"totle\":$cnm}}");
    //echo json_encode("{\"page\":{\"type\":$type,\"maxPage\":$maxPage,\"page\":$page,\"pageSize\":$pageSize},\"lists\":$cnm}");

    $dd = json_decode("{\"type\":$type,\"maxPage\":$maxPage,\"page\":$page,\"pageSize\":$pageSize}");
echo print_r($dd);

    //echo json_encode($datas);
}
else{
    echo "无";
    // echo json_encode("{\"page\":{\"type\":$type,\"page\":$page,\"pageSize\":$pageSize},\"message\":\"内容为空\",\"list\":null}");
}

?>
</body>
</html>

