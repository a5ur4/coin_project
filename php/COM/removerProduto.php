<?php

require_once '../models/conector.php';
require_once '../models/verificador.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    global $conexao;
    $dadosJSON = json_decode(file_get_contents("php://input"), true);
    $nomeEmpresa = $dadosJSON['nomeEmpresa'];
    $nomeProduto = $dadosJSON['nomeProduto'];
    $valorProduto = $dadosJSON['valorProduto'];

    $idEmpresa = capturarIdEmpresa($nomeEmpresa);

    $produtoExiste = mysqli_query($conexao, "SELECT * FROM `product` WHERE `name` = '$nomeProduto' AND `value` = '$valorProduto' 
    AND `FK_product_enterprise` = '$idEmpresa'");
    $fetchProdutos = mysqli_fetch_row($produtoExiste);
    $produtoExiste = mysqli_num_rows($produtoExiste) > 0 ? true : false;
    
    if ($produtoExiste) {
        $idProduto = $fetchProdutos[0];

        mysqli_query($conexao, "DELETE FROM `product` WHERE `id` = '$idProduto'");
        header("OK", true, 200);
        echo json_encode(array("mensagem" => "Produto deletado com sucesso!"));

    } else {
        header("OK", 200);
        echo json_encode(array("mensagem" => "Produto não encontrado... Tem certeza que os dados estão corretos?"));
    }
}
