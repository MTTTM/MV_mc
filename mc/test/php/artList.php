<?PHP
header('Content-type:text/json');
header('Content-type: text/html; charset=utf8');
require_once('connect.php');
$page = $_POST['currentPage'];//当前页码
$pageSize = $_POST['perPages'];//每页显示条数
$maxPage = $_POST['totalPages'];//最大页数
$totle = $_POST['totalItems'];//总数量

$type = $_POST['type'];//类别
$username = $_POST['username'];//用户名
//// 确定当前页数 $p 参数
$p = $page?$page:1;
// 数据指针
$offset = ($p-1)*$pageSize;
//exit("操你妈逼".$offset."pageSize:".$pageSize."类型：".$type);
$sql = "select * from blog where type=$type  ORDER BY id DESC LIMIT $offset , $pageSize";
$query = mysql_query($sql) or die("留言查询错误:"+mysql_error());
$count_result = mysql_query("select count(*) from blog where type=$type");
$count_array = mysql_fetch_array($count_result);
$totle=$count_array['count(*)'];//总个数
$maxPage=$totle>0?ceil($totle/$pageSize):0;//最大页数

if( $query && mysql_num_rows($query) ){
    while($row = mysql_fetch_assoc($query)){
        $time=$row['time'];
        $type=$row['type'];
        $username=$username;
        $content=htmlspecialchars_decode($row['content']);
        $title=htmlspecialchars_decode($row['title']);
        $id=htmlspecialchars_decode($row['id']);
        $data[] = array("content"=>$content,"title"=>$title,"time"=>$time,"type"=>$type,"id"=>$id);
        //$data[] = $row;
    };
 // $dd=array("list"=>$data,"page"=>array("type"=>$type,"maxPage"=>$maxPage,"page"=>$page,"pageSize"=>$pageSize,"totalItems"=>$count_array[0]));
    $dd=array("list"=>$data,"page"=>array("type"=>$type,"totalPages"=>$maxPage,"currentPage"=>$page,"perPages"=>$pageSize,"totalItems"=>$count_array[0]));
    echo json_encode($dd);
}
else{
    $dd=array();
    echo json_encode($dd);
}
?>