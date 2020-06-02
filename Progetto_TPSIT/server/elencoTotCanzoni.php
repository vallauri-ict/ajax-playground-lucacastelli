<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	
   	// 1. connessione
	$con=_connection("cantanti");
 
	
    // 3. Query
    $sql = "SELECT * FROM cantanti";
    $data = _eseguiQuery($con, $sql);

    $data = array("name"=>"Guest", "data"=>$data);
    echo json_encode($data);    


    $con->close();
?>