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

    $nomeEmpresa = $data->nomeEmpresa;
    $idEmpresa = capturarIdEmpresa($nomeEmpresa);

    $produtos = mysqli_query($conexao, "SELECT `name`, `value` FROM `product` WHERE `FK_product_enterprise` = '$idEmpresa'");
    $resultados = array();

    if (mysqli_num_rows($produtos) > 0) {
        while ($row = mysqli_fetch_assoc($produtos)) {
            $resultados[] = $row;
        }
        header('OK', true, 200);
        echo json_encode(array("produtos" => $resultados));
    } else {
        header("NOT FOUND", true, 404);
    }
}
