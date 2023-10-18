<?php

require_once '../models/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

global $conexao;

function gerarGuid()
{
    $guid = uniqid("VTC", true);
    return $guid;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);
    
    $nomeCliente = $data->nomeCliente;
    $dataNascimento = $data->dataNascimento;
    
    $dataIntermediaria = strtotime($dataNascimento);
    $dataFormatadaParaDB = date('Y-m-d', $dataIntermediaria);
    $guid = gerarGuid();

    mysqli_query($conexao, "INSERT INTO `client` (`guid`, `name`, `birth_date`) VALUES ('$guid', '$nomeCliente', '$dataFormatadaParaDB')");
    header('HTTP/1.1 201 CREATED');
}
