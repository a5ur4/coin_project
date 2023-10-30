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

    $usuario = $data->usuario;
    $novaSenha = $data->novaSenha;

    if (empty($usuario) || empty($novaSenha)) {
        header("Bad Request", true, 400);
        echo json_encode(array("message" => "A nova senha não pode ser vazia."));
        exit;
    }

    if (strlen($novaSenha) < 6) {
        header("Bad Request", true, 400);
        echo json_encode(array("message" => "A senha precisa ter mais de 6 caracteres."));
        exit;
    }

    $usuario_existe = mysqli_query($conexao, "SELECT `login` FROM `user` WHERE `login` = '$usuario'");

    if (mysqli_num_rows($usuario_existe) == 0) {
        header("Erro interno do servidor.", true, 505);
        echo json_encode(array("message"=> "Ops! Infelizmente ocorreu um erro interno."));
    } else {
        mysqli_query($conexao,"UPDATE `user` SET `password` = '$novaSenha' WHERE `login` = '$usuario'");
        header(200, true, 200);
        echo json_encode(array("message"=> "A senha foi alterada com sucesso."));
    }
}
