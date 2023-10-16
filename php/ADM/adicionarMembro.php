<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../controllers/conector.php';
require_once '../controllers/verificador.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    global $conexao;
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);
    $nome = $data->nome;
    $login = $data->login;
    $senha = "senhaPadraoVTC123";
    $ocupacao = "";
    $observacao = $data->observacao;
    $nomeEmpresa = $data->nomeEmpresa;

    try {

    $FK_USER_ENTERPRISE = capturarIdEmpresa($nomeEmpresa);
    if ($data->ocupacao == "Administrador") {
        $ocupacao = "admin";
    }
    if ($data->ocupacao == "Comissao") {
        $ocupacao = "commission";
    }
    if ($data->ocupacao == "Trabalhador") {
        $ocupacao = "worker";
    }

    $jaExiste = mysqli_query($conexao, "SELECT `login` FROM `user` WHERE `login` = '$login'");

    if (mysqli_num_rows($jaExiste) != 0) {
        header("See Other", true, 303);
    }else {
        mysqli_query($conexao, "INSERT INTO `user`(`name`,`occupation`, `login`,`password`, `observation`, `FK_user_enterprise`) 
        values ('$nome', '$ocupacao', '$login', '$senha', '$observacao', '$FK_USER_ENTERPRISE')");
        header('CREATED', true, 201);
    }
    } catch (mysqli_sql_exception) {
        header("Not found", true, 404);
        json_encode(array("message" => "O servidor php não foi localizado"));
    }

}
?>