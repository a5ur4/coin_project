<?php

require_once '../models/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

function verificarCliente($dadosJSON)
{
    global $conexao;
    $guidJSON = $dadosJSON['idCliente'];

    $stmt = mysqli_prepare($conexao, "SELECT * FROM `client` WHERE `guid` = ?");
    mysqli_stmt_bind_param($stmt, "s", $guidJSON);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        header('OK', true, 200);
        $response = array("message" => "Cliente localizado.");
        echo json_encode($response);
    } else {
        header("NOT FOUND", true, 404);
        $response = array("message" => "Cliente não localizado.");
        echo json_encode($response);
    }
    mysqli_stmt_close($stmt);
}

function capturarNome($dadosJSON)
{
    global $conexao;
    $guidJSON = $dadosJSON['idCliente'];

    $requisicao = mysqli_query($conexao, "SELECT `name` FROM `client` WHERE `guid` = '$guidJSON'");

    if ($requisicao) {
        $cliente = mysqli_fetch_assoc($requisicao);

        if ($cliente) {
            $nomeCliente = $cliente['name'];
            header('Content-Type: application/json');
            echo json_encode(array("nome" => $nomeCliente));
        } else {
            header('Not Found', true, 404);
        }
    } else {
        header('Internal Server Error', true, 500);
    }
}

function adicionarCredito($dadosJSON)
{
    global $conexao;
    $guidJSON = $dadosJSON['idCliente'];
    $valorCredito = $dadosJSON['credito'];

    $credito_atual = mysqli_query($conexao, "SELECT `wallet` FROM `client` WHERE `guid` = '$guidJSON'");
    if ($credito_atual === false) {
        echo "Erro na consulta: " . mysqli_error($conexao);
        header('Cliente não encontrado', true, '404');
    } else {
        $row = mysqli_fetch_assoc($credito_atual); // Extrair a linha da consulta
        $valor_atual = $row['wallet'];
        $novo_credito = $valor_atual + $valorCredito;
        mysqli_query($conexao, "UPDATE `client` SET wallet = $novo_credito WHERE `guid` = '$guidJSON'");
        header('Valor adicionado com sucesso', true, '200');
    }


}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dadosJSON = json_decode(file_get_contents("php://input"), true);
    if (isset($dadosJSON['funcao'])) {
        $funcao = $dadosJSON['funcao'];
        $guidCliente = $dadosJSON['idCliente'];

        if ($funcao == 'verificarClientePOST') {
            verificarCliente($dadosJSON);
        }

        if ($funcao == 'capturarNome') {
            capturarNome($dadosJSON);
        }

        if ($funcao == 'adicionarCredito') {
            adicionarCredito($dadosJSON);
        }
    }
}
