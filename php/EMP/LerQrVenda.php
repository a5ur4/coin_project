<?php

require_once '../models/conector.php';
require_once '../models/verificador.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function converterData($data)
{

    $timestamp = strtotime($data);
    $dataFormatada = date("dmY", $timestamp);
    return $dataFormatada;
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $idCliente = $data->idCliente;
    $senhaCliente = $data->senhaCliente;
    $valorTotal = $data->valorTotal;
    $usuario = $data->usuario;
    $empresa = $data->empresa;
    $idEmpresa = capturarIdEmpresa($empresa);
    $idUsuario = capturarIdUsuario($usuario);

    $saldoEmpresaQuery = mysqli_query($conexao, "SELECT `balance` FROM enterprise WHERE `id` = '$idEmpresa'");
    $saldoClienteQuery = mysqli_query($conexao, "SELECT * FROM `client` WHERE `guid` = '$idCliente'");

    if (mysqli_num_rows($saldoClienteQuery) == 1) {
        $resultadoFetchEmpresa = mysqli_fetch_array($saldoEmpresaQuery);
        $resultadoFetch = mysqli_fetch_array($saldoClienteQuery);
        $saldoEmpresa = $resultadoFetchEmpresa["balance"];
        $nomeCliente = $resultadoFetch['name'];
        $saldoCliente = $resultadoFetch['wallet'];
        $nascimentoCliente = $resultadoFetch['birth_date'];
        $nascimentoCliente = converterData($nascimentoCliente);
        $dataHoraAtual = date('Y-m-d H:i:s');

        if ($senhaCliente == $nascimentoCliente) {
            $novoSaldo = $saldoCliente - $valorTotal;
            if ($novoSaldo >= 0) {
                $novoSaldoEmpresa = $saldoEmpresa + $valorTotal;
                mysqli_query($conexao, "UPDATE `client` SET `wallet` = '$novoSaldo' WHERE `guid` = '$idCliente'");
                mysqli_query($conexao, "UPDATE `enterprise` SET `balance` = '$novoSaldoEmpresa' WHERE `id` = '$idEmpresa'");
                mysqli_query($conexao, "INSERT INTO paybox (`type`, `value`, `date_hour`, `responsible`, `FK_paybox_user` ,`FK_paybox_enterprise`)
            VALUES ('input', '$valorTotal', '$dataHoraAtual', '$usuario', '$idUsuario' , '$idEmpresa')");
                header('OK', true, 200);
                echo json_encode(array("mensagem" => "A venda foi realizada com sucesso. Obrigado!"));
            } else {
                header("Unauthorized", true, 401);
                echo json_encode(array("mensagem" => "Ops! Parece que o cliente não tem saldo suficiente."));
            }
        } else {
            header("Unauthorized", true, 401);
            echo json_encode(array("mensagem" => "A senha do usuário foi digitada errada."));
        }
    }
}
