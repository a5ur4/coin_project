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
    $consulta = mysqli_query($conexao, "SELECT `balance`, `description` FROM enterprise WHERE `name` = '$nomeEmpresa'");

    if (mysqli_num_rows($consulta) == 1) {
        $dados = mysqli_fetch_row($consulta);
        echo json_encode(array("saldo" => $dados[0], "descricao" => $dados[1], "nomeEmpresa" => $nomeEmpresa));
        header('OK', true, 200);
    }else {
        echo json_encode(array("alerta" => "Wanessaaaaaaaaaaaaaaaaaaaaaa"));
        header('INTERNAL ERROR', true, 303);
    }
}