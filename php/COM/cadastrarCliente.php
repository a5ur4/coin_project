<?php

require_once '../../library/conector.php';
require_once '..\api_php\verificador.php';

global $conexao;

function gerarGuid()
{
    $guid = uniqid("TheWeeknd", true);
    return $guid;
}

$guid = gerarGuid();

// $nomeCliente = $_POST['nomeCliente'];
// $dataNascimento = $_POST['dataCliente'];

$nomeCliente = 'Aw21 Jorge';
$dataNascimento = '5-02-2006';

$dataIntermediaria = strtotime($dataNascimento);
$dataFormatadaParaDB = date('Y-m-d', $dataIntermediaria);

mysqli_query($conexao, "INSERT INTO `client` (`guid`, `name`, `birth_date`) VALUES ('$guid', '$nomeCliente', '$dataFormatadaParaDB')");
header('HTTP/1.1 201 CREATED');
exit();