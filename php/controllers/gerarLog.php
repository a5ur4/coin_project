<?php

require_once 'conector_log.php';

function logMsg ($msg, $level = 'info') {
    global $conexao;
    $levelStr = '';
    
    switch ($level) {
        case 'info':
        case 'INFO':
            $levelStr = 'info';
            break;
        
        case 'warning':
        case 'WARNING':
            $levelStr = 'warning';
            break;

        default:
            $levelStr = 'error';
            break;
    }

    $date = date('Y-m-d H:i:s');
    $query = "INSERT INTO logteste(`data`,tipo, mensagem) VALUES (?,?,?)";
    $log_stmt = $conexao->prepare($query);
    $log_stmt->bind_param('sss', $date,$levelStr, $msg);
    $log_stmt->execute();
}
