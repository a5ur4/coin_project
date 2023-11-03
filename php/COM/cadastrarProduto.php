<?php

require_once '../models/conector.php';
require_once '../models/verificador.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function listarEmpresas() {
    global $conexao;

    try {
        $consulta = mysqli_query($conexao,"SELECT `id`, `name` FROM enterprise");
        if (!$consulta) {
            die("Erro na consulta: " . mysqli_error($conexao));
        }
        $empresas = array();

        while ($linha = mysqli_fetch_assoc($consulta)) {
            $empresas[] = $linha;
        }

        echo json_encode($empresas);
    } catch (mysqli_sql_exception) {
        header("Not Found", true, 404);
    }
}

function cadastrarProduto($dadosJSON) {
    global $conexao;

    $nomeProduto = $dadosJSON['nomeProduto'];
    $valorProduto = $dadosJSON['valorProduto'];
    $nomeEmpresa = $dadosJSON['nomeEmpresa'];

    $FK_PRODUCT_ENTEPRISE = capturarIdEmpresa($nomeEmpresa);

    $adicionar_produto = mysqli_query($conexao, "INSERT INTO product(`name`, `value`, `FK_PRODUCT_ENTERPRISE`) VALUES ('$nomeProduto', '$valorProduto', '$FK_PRODUCT_ENTEPRISE')");

    if ($adicionar_produto) {
        echo "Produto adicionado com sucesso";
        header('HTTP/1.1 201 CREATED');
    } else {
        echo "Erro ao inserir a empresa: " . mysqli_error($conexao);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    if (isset($_GET['funcao'])) {
        $funcao = $_GET['funcao'];
        
        if ($funcao === 'listarEmpresas') {
            listarEmpresas();
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dadosJSON = json_decode(file_get_contents("php://input"), true);

    if (isset($dadosJSON['funcao'])) {
        $funcao = $dadosJSON['funcao'];

        if ($funcao === 'cadastrarProdutoPOST') {
            cadastrarProduto($dadosJSON);
        }
    }
}

?>
