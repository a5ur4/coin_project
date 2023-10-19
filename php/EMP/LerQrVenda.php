<?php

require_once '../models/conector.php';
require_once '../models/verificador.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $idCliente = $data->idCliente;
    $valorTotal = $data->valorTotal;

    $saldoClienteQuery = mysqli_query($conexao, "SELECT * FROM `client` WHERE `guid` = '$idCliente'");
    if (mysqli_num_rows($saldoCliente) == 1) {
        if ($valorTotal < $saldoCliente) {
            $saldoClienteData = mysqli_fetch_assoc($saldoClienteQuery);
            $saldoCliente = $saldoClienteData['wallet'];
            $novoSaldo = $saldoCliente - $valorTotal;
            mysqli_query($conexao, "UPDATE `client` SET `wallet` = '$novoSaldo' WHERE `guid` = '$idCliente'");
            header('OK', true, 200);
            echo json_encode(array("mensagem" => "Venda realizada com sucesso."));
        } else {
            header("Error", true, 600);
            echo json_encode(array("mensagem" => "A tentativa de venda falhou."));
        }
    }
}
