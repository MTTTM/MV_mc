<?php
session_start();
if(isset($_SESSION['username'])){
    echo(json_encode(array("status"=>1,'username'=> $_SESSION['username'])));
}
else{
    echo(json_encode(array("status"=>0,'username'=> $_SESSION['username'])));
}
