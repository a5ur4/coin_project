<?php

require_once '../../library/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER["REQUEST_METHOD"] === "GET"){
    $resultado = mysqli_query($conexao, 'SELECT * FROM enterprise');

    if(mysqli_num_rows($resultado) > 0){
        $empresas = array();

        while ($linha = $resultado->fetch_assoc()) {
            $empresas[] = $linha;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($empresas);
} else {
    echo "Nenhuma empresa encontrada.";
}
