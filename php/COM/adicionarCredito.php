<?php

require_once '../controllers/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function verificarCliente($dadosJSON){  
    global $conexao;
    $guidJSON = $dadosJSON['idCliente'];
    echo $guidJSON;

    $requisicao = mysqli_query($conexao, "SELECT * FROM `client` WHERE `guid` = '$guidJSON'");

    if (mysqli_num_rows($requisicao) > 0) {
        header('OK', true, 200);
        $response = array("message" => "Achei.");
        echo json_encode($response);
    }

    if (mysqli_num_rows($requisicao) == 0) {
        header("NOT FOUND", true, 404);
        $response = array("message" => "Cliente não localizado.");
        echo json_encode($response);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dadosJSON = json_decode(file_get_contents("php://input"), true);
    if (isset($dadosJSON['funcao'])) {
        $funcao = $dadosJSON['funcao'];
        $guidCliente = $dadosJSON['idCliente'];

        if ($funcao === 'verificarClientePOST') {
            verificarCliente($dadosJSON);
        }
    }
}


