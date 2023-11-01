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
    $nomeUsuario = $data->nomeUser;
    $nomeProduto = $data->nomeProduto;
    $nomeEmpresa = $data->nomeEmpresa;
    $valorTotal = $data->valorTotal;
    $dataHoraAtual = date('Y-m-d H:i:s');

    $idEmpresa = capturarIdEmpresa($nomeEmpresa);
    $idUsuario = capturarIdUsuario($nomeUsuario);

    if (empty($nomeProduto) || empty($valorTotal)) {
        header("Bad Request", true, 400);
        echo json_encode(array("message" => "Ops! Algum dos valores indicados não pode estar vazio..."));
        exit;
    }

    mysqli_query($conexao, "INSERT INTO paybox (`type`, `value`, `date_hour`, `responsible`, `FK_paybox_enterprise`, `FK_paybox_user`)
     VALUES ('output', '$valorTotal', '$dataHoraAtual', '$nomeUsuario', '$idEmpresa', '$idUsuario')");

    $saldoAtual = mysqli_query($conexao,"SELECT `balance` FROM `enterprise` WHERE `id` = '$idEmpresa'");
    $saldoAtual = floatval(mysqli_fetch_row($saldoAtual)[0]);
    $novoSaldo = $saldoAtual - $valorTotal;

    if ($novoSaldo < 0) {
        header("OK", true, 200);
        echo json_encode(array("mensagem" => "Atenção! Sua empresa ficará com saldo negativo após essa compra."));
        mysqli_query($conexao,"UPDATE `enterprise` SET `balance` = '$novoSaldo' WHERE `id` = '$idEmpresa'");

    } else {
        header("OK", true, 200);
        echo json_encode(array("mensagem" => "O comprovante foi registrado com sucesso."));
        mysqli_query($conexao,"UPDATE `enterprise` SET `balance` = '$novoSaldo' WHERE `id` = '$idEmpresa'");
    }
}
