<?php

require_once 'controllers/conector.php';
require_once '../vendor/autoload.php';

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

    $consulta = mysqli_query($conexao, "SELECT `name`, `occupation`, `FK_user_enterprise`
    FROM `user` WHERE `login` = '$login' AND `password` = '$senha'");

    if (mysqli_num_rows($consulta) == 1) {
        $dados = mysqli_fetch_row($consulta);
        header("OK", true, 200);
        header("Content-Type: application/json");

        $idEmpresa = $dados[2];
        $nomeEmpresa = mysqli_query($conexao, "SELECT `name` FROM `enterprise` WHERE `id` = '$idEmpresa'");
        $nomeEmpresa = mysqli_fetch_row($nomeEmpresa);

        $payload = [
            'nome' => $dados[0],
            'cargo' => $dados[1],
            'empresa' => $nomeEmpresa[0],
        ];


        $token = Firebase\JWT\JWT::encode($payload, "5C1NOPRIJECT32", 'HS256');
        echo json_encode(array("message" => "Usuário encontrado.", "token" => $token));
    } else {
        header("Unauthorized", true, 401);
        echo json_encode(array("message" => "Credenciais inválidas."));
    }
}
