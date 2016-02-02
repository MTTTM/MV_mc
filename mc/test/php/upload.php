<?php
$name = isset($_POST['name'])? $_POST['name'] : '';
$gender = isset($_POST['gender'])? $_POST['gender'] : '';
//echo json_encode(array("长度",count($_FILES['photo']['name'])));
//$filename = time().substr($_FILES['photo']['name'], strrpos($_FILES['photo']['name'],'.'));
$uploads_dir = '../uploads/img/';
$dir_retrun='uploads/img/';
$tmp = array();

for($i=0;$i<count($_FILES['photo']['name']);$i++) { //foreach 循环处理多个文件上传
    $filename = time().substr($_FILES['photo']['name'][$i], strrpos($_FILES['photo']['name'][$i],'.'));
    if(move_uploaded_file($_FILES['photo']['tmp_name'][$i], "$uploads_dir$filename")){
        $response = array();
        $response['isSuccess'] = true;
        $response['name'] = $name;
        $response['gender'] = $gender;
        $response['photo'] = "$dir_retrun$filename";
        array_push($tmp,$response);
    }else{
        $response['isSuccess'] = false;
    }
}
//for($i=0;$i<$tmp.length;$i++){
//    if($tmp[$i]['isSuccess']==false){
//        $tmp['isSuccess']=false;
//        break;
//    }
//}
echo json_encode($tmp);
?>