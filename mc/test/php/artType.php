<?PHP
  require_once('connect.php');
  	//$mid = $_GET['mid'];
  	$sql = "select * from type";
  	$query = mysql_query($sql) or die("留言查询错误:"+mysql_error());;
  	if( $query && mysql_num_rows($query) ){
  		while($row = mysql_fetch_assoc($query)){
  			$data[] = $row;
  		}
  		echo json_encode($data);
  	}

  ?>