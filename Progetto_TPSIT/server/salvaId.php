<?php
    require ("_libreria.php");
    session_start();
    $_SESSION["CodCantanti"] = $_REQUEST["id"];
    echo json_encode(array("ris"=>"si"));     
?>
