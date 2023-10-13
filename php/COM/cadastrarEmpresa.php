<?php

require_once '../controllers/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);
    
    $nomeEmpresa = $data->nomeEmpresa;
    $descricaoEmpresa = $data->descricaoEmpresa;
    $saldoEmpresa = $data->saldoEmpresa;

    $adicionar_empresa = mysqli_query($conexao, "INSERT INTO enterprise(`name`, `balance`, `description`) VALUES ('$nomeEmpresa', '$saldoEmpresa', '$descricaoEmpresa')");

    if ($adicionar_empresa) {
        header('HTTP/1.1 201 CREATED');
    } else {
        echo "Erro ao inserir a empresa: " . mysqli_error($conexao);
    }
}
