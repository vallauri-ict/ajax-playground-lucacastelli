<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    // controllo parametri
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
    if (!isset($_REQUEST["num"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (num).");
    }

       // 1. connessione
    $con=_connection("cantanti");

    // 2. Lettura parametri
    $nome = $con->real_escape_string($_REQUEST["nome"]);
    $titolo = $con->real_escape_string($_REQUEST["titolo"]);
    $feat = $con->real_escape_string($_REQUEST["feat"]);
    $num = $con->real_escape_string($_REQUEST["num"]);

    // 3. Query per persone inserite
    $sql = "SELECT * FROM cantanti WHERE username='$nome';";
    $date = _eseguiQuery($con,$sql);
    
    
    session_start();
    $user=$_SESSION["User"];

    if((count($date)>0)&&(($nome)!=$user))
    {
        die ("Username già in uso.");
        $con->close();
    }
    else
    {
        if(($user=="Guest")||($nome!=$user))
        {
            $sql = "INSERT INTO cantanti(CodCantanti,username,password) VALUES ('$num','$nome','5f4dcc3b5aa765d61d8327deb882cf99')";
            $data=_eseguiQuery($con, $sql);

            $sql = "INSERT INTO canzoni(nome,feat,CodCantanti) VALUES ('$titolo','$feat','$num')";
            $ris=_eseguiQuery($con, $sql);
        }
        else
        {
            $id=$date[0]['CodCantanti'];
            $sql = "INSERT INTO canzoni(nome,feat,CodCantanti) VALUES ('$titolo','$feat','$id')";
            $ris=_eseguiQuery($con, $sql);
        }
    }
    echo $ris;
    $con->close();

?>