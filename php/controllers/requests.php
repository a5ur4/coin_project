<?php

require_once '..\library\conector.php';
require_once '..\library\verificador.php';

function listarUser()
{
    global $conexao;
    $result = mysqli_query($conexao, "SELECT * FROM user");
    if ($result->num_rows >= 1) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        header('HTTP/1.1 200 OK');
        echo $json_output = json_encode($rows);
        exit();
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        echo "Não foi encontrado nenhum item.";
        exit();
    }
}

function listarClient()
{
    global $conexao;
    $result = mysqli_query($conexao, "SELECT * FROM client");
    if ($result->num_rows >= 1) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        header('HTTP/1.1 200 OK');
        echo $json_output = json_encode($rows);
        exit();
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        echo "Não foi encontrado nenhum item.";
        exit();
    }
}

function listarEnterprise()
{
    global $conexao;
    $result = mysqli_query($conexao, "SELECT * FROM enterprise");
    if ($result->num_rows >= 1) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        header('HTTP/1.1 200 OK');
        echo $json_output = json_encode($rows);
        exit();
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        echo "Não foi encontrado nenhum item.";
        exit();
    }
}

function listarPaybox()
{
    global $conexao;
    $result = mysqli_query($conexao, "SELECT * FROM paybox");
    if ($result->num_rows >= 1) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        header('HTTP/1.1 200 OK');
        echo $json_output = json_encode($rows);
        exit();
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        echo "Não foi encontrado nenhum item.";
        exit();
    }
}

function listarPurchase()
{
    global $conexao;
    $result = mysqli_query($conexao, "SELECT * FROM purchase");
    if ($result->num_rows >= 1) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        header('HTTP/1.1 200 OK');
        echo $json_output = json_encode($rows);
        exit();
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        echo "Não foi encontrado nenhum item.";
        exit();
    }
}

listarUser();