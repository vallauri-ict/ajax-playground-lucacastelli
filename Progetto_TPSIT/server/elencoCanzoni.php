<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
    _checkSession("CodCantanti");
	// 1. connessione
    $con=_connection("cantanti");
	
	// 2. Lettura parametri 
	$id = $_SESSION["CodCantanti"];
	
	// 3. Query
    //$sql="select username from cantanti where codCantanti = $id;";
	$user = $_SESSION["User"];
	$sql = "SELECT nome, feat FROM canzoni WHERE codCantanti = $id;";
    $data = _eseguiQuery($con, $sql);

    $data = array("name"=>$user, "data"=>$data);
	echo json_encode($data);
    
	// 4. close
    $con->close();
?>