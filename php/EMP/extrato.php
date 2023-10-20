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

    $idEmpresa = capturarIdEmpresa($data->nomeEmpresa);
    $informacoes = mysqli_query($conexao, "SELECT * FROM `paybox` WHERE `FK_paybox_enterprise` = '$idEmpresa'");
    $extrato = array();

    while ($valores = mysqli_fetch_assoc($informacoes)) {
        if ($valores['type'] === "input") {
            $valores['type'] = "entrada";
        } elseif ($valores['type'] === "output") {
            $valores['type'] = "saída";
        }

        $extrato[] = $valores;
    }


    if (!empty($extrato)) {
        header('OK', true, 200);
        echo json_encode(array("extrato" => $extrato));
    } else {
        header('OK', true, 200);
        echo json_encode(array("extrato" => array()));
    }
}
