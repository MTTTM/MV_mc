<?PHP

	require_once('connect.php');
	
	$mid = $_POST['mid'];
	$text = htmlspecialchars($_POST['text']);//对特殊字符串进行转码
	
	$sql = "insert into message_list(mid,text) values($mid , '$text')";
	
	$query = mysql_query($sql);
	
	if($query){
		echo '{"code":"1","message":"'.$text.'"}';
	}
	else{
		echo '{"code":"0","message":"添加失败"}';
	}

?>