<?PHP

require_once('connect.php');
$id=$_GET['id'];
$sql = "select * from music_list WHERE id=$id";

$query = mysql_query($sql) or die("查询错误:"+mysql_error());

if( $query && mysql_num_rows($query) ){
    echo json_encode(mysql_fetch_assoc($query));
}

?>