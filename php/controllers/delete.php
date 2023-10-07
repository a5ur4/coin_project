<?php


require_once '..\library\conector.php';
require_once '..\library\verificador.php';

function deletarDado($tabelaOrigem, $idAlvo)
{
    global $conexao;

    if (verificarExistencia($tabelaOrigem, $idAlvo) == 1) {
        mysqli_query($conexao, "DELETE FROM `$tabelaOrigem` WHERE `id` = $idAlvo");
        header('HTTP/1.1 200 OK');
    } else {
        header('HTTP/1.1 404 NOT FOUND');
        echo "Não foi encontrado nenhum usuário na tabela: $tabelaOrigem e id: $idAlvo.";
    }

    if (verificarExistencia($tabelaOrigem, $idAlvo) == 1) {
        header('HTTP/1.1 200 OK');
        echo "Deletado com sucesso";
    } else {
        header('HTTP/1.1 404 NOT FOUND');
    }
}

if (true) {
    //$id = $_POST['id'];
    //$tabelaOrigem = $_POST['tabela'];
    global $conexao;

    $idAlvo = 141;
    $tabelaOrigem = "user";

    deletarDado($tabelaOrigem, $idAlvo);
}