<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
echo "PHP EXECUTADO";

require_once '../../library/conector.php';
require_once '../../api_php/verificador.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $nome = $data->nome;
    $login = $data->login;
    $senha = "senhaPadraoVTC123";
    $ocupacao = $data->ocupacao;
    $observacao = $data->observacao;
    $nomeEmpresa = $data->nomeEmpresa;

    $FK_USER_ENTEPRISE = capturarIdEmpresa($nomeEmpresa);

    $adicionarUsuario = mysqli_query($conexao, "INSERT INTO `user`(`name`,`occupation`, `login`,`password`, `observation`, `FK_user_enterprise`) values ('$nome', '$ocupacao', '$login', '$senha', '$observacao', '$FK_USER_ENTERPRISE')");
}

?>