<?php

require_once 'conector.php';


// Verifica se existe qualquer dado na tabela ($tabelaOrigem) e no id ($idAlvo) fornecidos.
// Em caso de empresa é recomendado utilizar a função verificarExistenciaEmpresa($nomeEmpresa)
function verificarExistencia($tabelaOrigem, $idAlvo)
{
    global $conexao;

    $escapedId = mysqli_real_escape_string($conexao, $idAlvo);
    $quantidade = mysqli_query($conexao, "SELECT * FROM `$tabelaOrigem` WHERE `id` = $escapedId");

    if ($quantidade->num_rows >= 0) {
        return 1;
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        return 0;
    }
}

// Utilizado para verificar se uma empresa realmente existe utilizando seu nome.
function verificarExistenciaEmpresa($nomeEmpresa)
{
    global $conexao;

    $quantiEmpresa = mysqli_query($conexao, "SELECT * FROM `enterprise` WHERE `name` = '$nomeEmpresa'");
    if ($quantiEmpresa->num_rows == 1) {
        return 1;
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        return 0;
    }
}

// Utilizado para conseguir o ID da empresa através do seu nome.
function capturarIdEmpresa($nomeEmpresa)
{
    global $conexao;

    if (verificarExistenciaEmpresa($nomeEmpresa) == 1) {
        //
    } else {
        HEADER('HTTP/1.1 400 BAD REQUEST');
        echo "Empresa não encontrada.";
        exit();
    }

    $quantidadeEmpresa = mysqli_query($conexao, "SELECT `id` FROM `enterprise` WHERE `name` = '$nomeEmpresa'");
    if (mysqli_num_rows($quantidadeEmpresa) == 1) {
        $row = mysqli_fetch_assoc($quantidadeEmpresa);
        $id = $row["id"];
        return $id;
    }
}

function capturarIdUsuario($nomeUsuario)
{
    global $conexao;

    $quantidadeUsuario = mysqli_query($conexao, "SELECT `id` FROM `user` WHERE `name` = '$nomeUsuario'");
    if (mysqli_num_rows($quantidadeUsuario) == 1) {
        $row = mysqli_fetch_assoc($quantidadeUsuario);
        $id = $row["id"];
        return $id;
    }
}

function capturarNomeEmpresa($idEmpresa)
{
    global $conexao;

    if (verificarExistenciaEmpresa($idEmpresa) == 1) {
        //
    } else {
        HEADER('HTTP/1.1 400 BAD REQUEST');
        echo "Empresa não encontrada.";
        exit();
    }

    $quantidadeEmpresa = mysqli_query($conexao, "SELECT `name` FROM `enterprise` WHERE `id` = '$idEmpresa'");
    if (mysqli_num_rows($quantidadeEmpresa) == 1) {
        $row = mysqli_fetch_assoc($quantidadeEmpresa);
        $nome_empresa = $row["name"];  // Correção aqui
        return $nome_empresa;
    }
}

// Verifica se existe login com o dado solicitado.
function AutenticadorLogin($login)
{
    global $conexao;

    $escapedLogin = mysqli_real_escape_string($conexao, $login);
    $quantidade = mysqli_query($conexao, "SELECT * FROM `user` WHERE `id` = $escapedLogin");

    if ($quantidade->num_rows >= 0) {
        return 1;
    } else {
        header('HTTP/1.1 400 BAD REQUEST');
        echo "O login não existe.";
        return 0;
    }
}

// Verifica se há cadastro já existente com o que está sendo solicitado para cadastro.
function AutenticadorCadastro($cadastro)
{
    global $conexao;

    $escapedCadastro = mysqli_real_escape_string($conexao, $cadastro);
    $quantidade = mysqli_query($conexao, "SELECT * FROM `user` WHERE `login` = '$escapedCadastro'");

    if (mysqli_num_rows($quantidade) == 0) {
        return 1;
    } else {
        return 0;
    }

}
