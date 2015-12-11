<?PHP

require_once('connect.php');
$page = $_GET['page'];
$len = 3;
$start = $page * $len;

$sql = "select id , name , musicName from music_list limit $start , $len";

$query = mysql_query($sql);

if( $query && mysql_num_rows($query) ){
    while($row = mysql_fetch_assoc($query)){
        $data[] = $row;
    }
    echo json_encode($data);
}
else{
    die(json_encode(array("data"=>"1")));
}
?>