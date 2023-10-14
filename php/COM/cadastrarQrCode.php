<?php

require_once '../controllers/conector.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$nomeCliente = $_POST['nomeCliente'];
$dataNascimento = $_POST['dataNascimento'];