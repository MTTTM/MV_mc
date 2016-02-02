<?PHP
require_once('connect.php');
$type = $_POST['type'];
$sql = "select * from blog where type=$type";
$query = mysql_query($sql) or die("留言查询错误:"+mysql_error());;
if( $query && mysql_num_rows($query) ){
    while($row = mysql_fetch_assoc($query)){
        $time=$row['time'];
        $type=$row['type'];
        $content=htmlspecialchars_decode($row['content']);
        $title=htmlspecialchars_decode($row['title']);
        $id=htmlspecialchars_decode($row['id']);
        $data[] = array("content"=>$content,"title"=>$title,"time"=>$time,"type"=>$type,"id"=>$id);
        //$data[] = $row;
    }
    echo json_encode($data);
}

?>