import React, { useState, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from "react-bootstrap/Button";
import "../../styles/general.css";
import "../../styles/styleCOM.css";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

const CadQrCode = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 250,
      },
      fps: 20,
    });


    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        setIdCliente(result)
        isScanning = false;
      }
    }

    function error(err) {
      try {
        throw "NotFoundException";
      } catch (e) { }
    }
  }, []);

  const enviarDados = async () => {

    try {
      const response = await axios.post(
        "http://localhost:8080/php/COM/cadastrarCliente.php",
        {
          nomeCliente: nomeCliente,
          dataNascimento: dataNascimento,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Cliente cadastrado com sucesso.");
        setNomeCliente('');
        setIdCliente('');
        setDataNascimento('')
      }
    } catch (error) {
      console.log("Ops! Deu algum erro: ", error);
    }
  };

  return (
    <>
      <NavBarCOM />
      <div className="box">
        <h2 className="text">Cadastrar Cliente</h2>
        <div className="contain-inputs">
          <div className="content-input">
            <label className="default-text">Nome:</label>
            <input
              required
              placeholder="Digite o nome do cliente"
              className="input"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            ></input>
          </div>
          <div className="content-input">
            <label className="default-text">Data de nascimento:</label>
            <input
              required
              placeholder="Digite a data de nascimento do cliente"
              className="input"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="btn-space">
          <Button disabled>Ou leia o QR Code para salvar o cliente.</Button>
          {scanResult ? (
            <div></div>
          ) : (
            <div id="reader"></div>
          )}
          <Button variant="warning" type="submit" onClick={enviarDados}>
            Concluir
          </Button>
        </div>
      </div>
    </>
  );
};

export default CadQrCode;
