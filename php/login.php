<?php

require_once 'models/conector.php';
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

    $stmt = mysqli_prepare($conexao, "SELECT `name`, `occupation`, `FK_user_enterprise` FROM `user` WHERE `login` = ? AND `password` = ?");
    mysqli_stmt_bind_param($stmt, "ss", $login, $senha);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) == 1) {
        mysqli_stmt_bind_result($stmt, $name, $occupation, $enterpriseId);
        mysqli_stmt_fetch($stmt);
        header("OK", true, 200);
        header("Content-Type: application/json");

        $idEmpresa = $enterpriseId;
        $stmt = mysqli_prepare($conexao, "SELECT `name` FROM `enterprise` WHERE `id` = ?");
        mysqli_stmt_bind_param($stmt, "i", $idEmpresa);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $nomeEmpresa);
        mysqli_stmt_fetch($stmt);

        $payload = [
            'nome' => $name,
            'cargo' => $occupation,
            'empresa' => $nomeEmpresa,
        ];

        $token = Firebase\JWT\JWT::encode($payload, "5C1NOPRIJECT32", 'HS256');
        if ($senha == "senhaPadraoVTC123") {
            echo json_encode(array("message" => "Usuário encontrado.", "senhaAlterar" => true , "token" => $token));
        } else {
            echo json_encode(array("message" => "Usuário encontrado.", "senhaAlterar" => false , "token" => $token));
        }
    } else {
        header("Unauthorized", true, 401);
        echo json_encode(array("message" => "Credenciais invalidas."));
    }
}
