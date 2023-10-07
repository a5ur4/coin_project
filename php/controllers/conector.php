<?php

    $dbhost = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "vtc_database";
    $port = "3306";

    $conexao = mysqli_connect($dbhost, $dbUsername, $dbPassword, $dbName, $port);

    if (!$conexao) {
        die("Conexão falhou: " . mysqli_connect_error());
    }
?>