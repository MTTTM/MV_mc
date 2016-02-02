<?php
header("Content-Type:text/html;charset=utf8");
    //文件存储路径
    $file_path="../upload/";
//664权限为文件属主和属组用户可读和写，其他用户只读。
    if(is_dir($file_path)!=TRUE) mkdir($file_path,0664) ;
    //定义允许上传的文件扩展名
    $ext_arr = array("jpg");


    if (empty($_FILES) === false) {
        //判断检查
        if($photo_up_size > 2097152){
            exit("对不起，您上传的照片超过了2M。");
        }
        if($_FILES["file"]["error"] > 0){
            exit("文件上传发生错误：".$_FILES["file"]["error"]);
        }


        //获得文件扩展名
        $temp_arr = explode(".", $_FILES["file"]["name"]);
        $file_ext = array_pop($temp_arr);
        $file_ext = trim($file_ext);
        $file_ext = strtolower($file_ext);
        //检查扩展名

        //以时间戳重命名文件
        $new_name = time().".".$file_ext;
        //将文件移动到存储目录下
        if( move_uploaded_file($_FILES["file"]["tmp_name"],"$file_path" . $new_name)){
            echo "文件上传成功！";
            exit;
        }else{
            echo "狗屎 没成功";
        }
        //向数据表写入文件存储信息以便管理
        //*********** 代码略 ***********//

    } else {
        echo "无正确的文件上传";
    }



?>