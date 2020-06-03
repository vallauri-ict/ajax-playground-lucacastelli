<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    // controllo parametri
    if (!isset($_REQUEST["name"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (name).");
    }

       // 1. connessione
    $con=_connection("cantanti");

    // 2. Lettura parametri
    $name = $con->real_escape_string($_REQUEST["name"]);

    // 3. Query per persone inserite
    $sql = "DELETE FROM canzoni WHERE nome='$name';";
    $ris = _eseguiQuery($con,$sql);

    echo $ris;
    $con->close();
?>