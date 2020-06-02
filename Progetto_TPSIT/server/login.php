<?php

    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		
		// 1. controllo parametri
		if (!isset($_POST['username'])) {
			http_response_code(400);
			die("Parametri mancancati: username");
		}
		if (!isset($_POST['password'])) {
			http_response_code(400);
			die("Parametri mancancati: password");
		}		
		
		// 2. connessione e lettura paramertri
		$con=_connection("cantanti");		
		$username=$con->real_escape_string($_POST['username']);
		$password=$con->real_escape_string($_POST['password']);
			    
		// 3. Query
		$sql = "select * from cantanti where username='$username'";	
        $data = _eseguiQuery($con, $sql);
		if(count($data)==0){
			http_response_code(401);
			die("Credenziali non valide");			
		}
		else if($data[0]['Password'] != $password){ 
			http_response_code(401);
			die("Credenziali non valide");			
		}
		
		// 4. creazione Session (solo nel caso del login)
		else{
			session_start();
            $_SESSION["CodCantanti"] = $data[0]['CodCantanti'];
            $_SESSION["User"] = $data[0]['username'];
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(),session_id(),time()+ SCADENZA, "/"); 
			
			// Lasciamo che sia il client ad eseguire il redirect	
			echo json_encode(array("ris"=>"ok"));
		}
		
		// 5. close
		$con->close();	
	}
?>
