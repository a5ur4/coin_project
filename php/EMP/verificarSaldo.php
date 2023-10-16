<?php

require_once '../controllers/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $id = $data->idCliente;

    $saldo = mysqli_query($conexao, "SELECT `name`, wallet FROM `client` WHERE `guid` = '$id'");
    if(mysqli_num_rows($saldo) == 1){

        $valores = mysqli_fetch_row($saldo);
        header('Content-Type: application/json');
        header('OK', true, 200);
        echo json_encode(array("name" => $valores[0], "saldo" => $valores[1]));
    } else {
        header('NOT FOUND', true, 404);

    }

}