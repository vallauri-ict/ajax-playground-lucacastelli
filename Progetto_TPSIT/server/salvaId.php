<?php
    require ("_libreria.php");
    session_start();
    $_SESSION["CodCantanti"] = $_REQUEST["id"];
    if($_SESSION["User"]=="Guest")
        echo json_encode(array("ris"=>"si"));
    else
        echo json_encode(array("ris"=>"no"));
        
?>
