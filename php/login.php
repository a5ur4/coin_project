<?php
use Firebase\JWT\JWT;

require_once 'controllers/conector.php';
require '../vendor/autoload.php'; // Importe a biblioteca JWT

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

    $query = "SELECT * FROM `user` WHERE `login` = ? AND `password` = ?";
    $stmt = mysqli_prepare($conexao, $query);
    mysqli_stmt_bind_param($stmt, "ss", $login, $senha);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    
    if (mysqli_stmt_num_rows($stmt) == 1) {

        $consulta = mysqli_query($conexao, "SELECT  `id`,`name`, `occupation` FROM `user` WHERE `login` = '$login'");
        $consulta = mysqli_fetch_row($consulta);
        
        $key = "A1n14L12e5R18i9J10h8K11a1W23a1P16e5I9g7";
        $payload = array(
            "user_id" => $consulta[0],
            "name" => $consulta[1],
            "cargo" => $consulta[2]
        );

        $token = JWT::encode($payload, $key, 'HS256');
        header("OK", true, 200);
        header("Content-Type: application/json");
        echo json_encode(array("token" => $token));
        error_log(json_encode(array("token" => $token)));
    } else {
        header("Unauthorized", true, 401);
        echo json_encode(array("message" => "Credenciais inválidas."));
    }
}
