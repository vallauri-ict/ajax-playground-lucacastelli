<?php
    require ("_libreria.php");
    if (!isset($_REQUEST["nome"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (nome).");
    }
    if (!isset($_REQUEST["titolo"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (titolo).");
    }
    if (!isset($_REQUEST["feat"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (feat).");
    }

    $con=_connection("cantanti");

    $nome=$_REQUEST["nome"];
    $titolo=$_REQUEST["titolo"];
    $feat=$_REQUEST["feat"];    
    
    $sql = "INSERT INTO cantanti(username,password) VALUES ("$nome",5f4dcc3b5aa765d61d8327deb882cf99)";
    $data=_eseguiQuery($con, $sql);

    $sql = "INSERT INTO canzoni(titolo,feat,CodCantanti) VALUES ("$titolo","$feat","23")";
    $data=_eseguiQuery($con, $sql);       
    
    echo json_encode(array("ris"=>"ok"));
    $con->close();

?>