<?php

require_once '../controllers/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

function mapearCargo($occupation) {
    if ($occupation == 'admin') {
        return 'Administrador';
    } elseif ($occupation == 'commission') {
        return 'Comissão';
    } elseif ($occupation == 'worker') {
        return 'Trabalhador';
    } else {
        return $occupation;
    }
}

function obterNomeDaEmpresa($conexao, $empresaId) {
    $resultado = mysqli_query($conexao, "SELECT `name` FROM `enterprise` WHERE `id` = $empresaId");
    if (mysqli_num_rows($resultado) > 0) {
        $linha = $resultado->fetch_assoc();
        return $linha['name'];
    }
    return "Empresa não encontrada";
}

if($_SERVER["REQUEST_METHOD"] === "GET"){
    $resultado = mysqli_query($conexao, 'SELECT `id`, `name`, `occupation`, `FK_user_enterprise` FROM `user`');

    if(mysqli_num_rows($resultado) > 0){
        $membros = array();

        while ($linha = $resultado->fetch_assoc()) {
            $linha['occupation'] = mapearCargo($linha['occupation']);
            $linha['FK_user_enterprise'] = obterNomeDaEmpresa($conexao, $linha['FK_user_enterprise']);
            $membros[] = $linha;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($membros);
} else {
    echo "Nenhuma empresa encontrada.";
}