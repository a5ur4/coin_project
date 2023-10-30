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
    $guid = $data->idCliente;

    if (empty($nomeCliente) || empty($dataNascimento)) {
        header("Bad Request", true, 200);
        echo json_encode(array("mensagem" => "Dados de cadastro ausentes."));
        exit;
    }

    $dataIntermediaria = strtotime($dataNascimento);
    $dataFormatadaParaDB = date('Y-m-d', $dataIntermediaria);

    $clienteExiste = mysqli_query($conexao, "SELECT * FROM `client` WHERE `guid` = '$guid'");

    if (mysqli_num_rows($clienteExiste) == 1 && $guid != "" ) {
        $jaCadastrado = mysqli_fetch_row($clienteExiste);

        if ($jaCadastrado[1] == "") {

            mysqli_query($conexao, "UPDATE `client` SET `name` = '$nomeCliente', `birth_date` = '$dataFormatadaParaDB' WHERE `guid` = '$guid'");
            header("OK", true, 200);
            echo json_encode(array("mensagem" => "O cliente $nomeCliente foi atribuído ao QrCode com sucesso"));
        } else {

            header("OK", true, 200);
            echo json_encode(array("mensagem" => "Esse QrCode ja pertence ao usuário " . $jaCadastrado[1], "idCliente" => $guid));
        }
    } else {

        if (empty($guid)) {
            $guid = gerarGuid();
            mysqli_query($conexao, "INSERT INTO `client` (`guid`, `name`, `birth_date`) VALUES ('$guid', '$nomeCliente', '$dataFormatadaParaDB') ");
            header("OK", true, 200);
            echo json_encode(array("mensagem" => "O cliente $nomeCliente foi criado com sucesso e um novo QrCode foi criado."));
        } else {
            mysqli_query($conexao, "INSERT INTO `client` (`guid`, `name`, `birth_date`) VALUES ('$guid', '$nomeCliente', '$dataFormatadaParaDB') ");
            header("OK", true, 200);
            echo json_encode(array("mensagem" => "O cliente $nomeCliente e o QrCode foram criados com sucesso."));
        }
        
    }
}
