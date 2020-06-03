<?php
    require ("_libreria.php");
    session_start();
    $_SESSION["CodCantanti"] = $_REQUEST["id"];
    $_SESSION['User']=$_REQUEST['User'];
    echo json_encode(array("ris"=>"si"));  
?>
