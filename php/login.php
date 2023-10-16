<?php

require_once 'controllers/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $login = $data->login;
    $senha = $data->senha;

    if (empty($login) || empty($senha)) {
        header("Bad Request", true, 400);
        echo json_encode(array("message" => "Dados de login ausentes."));
        exit;
    }

    $consulta = mysqli_query($conexao, "SELECT `id`, `name`, `occupation`, `FK_user_enterprise`
    FROM `user` WHERE `login` = '$login' AND `password` = '$senha'");

    if (mysqli_num_rows($consulta) == 1) {
        header("OK", true, 200);
        header("Content-Type: application/json");
    } else {
        header("Unauthorized", true, 401);
        echo json_encode(array("message" => "Credenciais inválidas."));
    }
}
