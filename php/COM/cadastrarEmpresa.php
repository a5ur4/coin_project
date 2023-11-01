<?php

require_once '../models/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $nomeEmpresa = $data->nomeEmpresa;
    $descricaoEmpresa = $data->descricaoEmpresa;
    $saldoEmpresa = $data->saldoEmpresa;

    $empresaExiste = mysqli_query($conexao, "SELECT `name` FROM enterprise WHERE `name` = '$nomeEmpresa'");

    if ( mysqli_num_rows($empresaExiste) > 0) {

        echo json_encode(array("mensagem" => "Ops! Ja existe uma empresa com esse nome."));
        header("OK", true, 200);

    } else {

        $adicionar_empresa = mysqli_query($conexao, "INSERT INTO enterprise(`name`, `balance`, `description`) VALUES ('$nomeEmpresa', '$saldoEmpresa', '$descricaoEmpresa')");
        if ($adicionar_empresa) {
            echo json_encode(array("mensagem" => "Empresa cadastrada com sucesso."));
            header('CREATED', true, 201);
        } else {
            echo json_encode(array("mensagem" => "Nao foi possível cadastrar a empresa."));
            header('OK', true, 200);
        }
    }
}
