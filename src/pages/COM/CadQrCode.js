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

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 250,
      },
      fps: 60,
      statusMessages: {
        notMatched: "Aponte para um código QR",
        permissionDenied: "Permissão da câmera negada",
      },
    });

    scanner.render(success, error);

    function success(result) {
      setIdCliente(result)
      console.log(result);
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
          idCliente: idCliente
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.mensagem);
        setNomeCliente('');
        setDataNascimento('')
      } else {
        alert("Erro interno do servidor, por favor tente novamente.");
      }
    } catch (error) {
      console.log("Ops! Deu algum erro: ", error);
    }
  };

  const limparId = () => {
    setIdCliente("")
  }

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
              onChange={(e) => {
                const inputDate = e.target.value;
                const match = inputDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                if (match) {setDataNascimento(inputDate)} 
              }}
            ></input>
          </div>
          <div className="content-input">
            <label className="default-text">Id do cliente:</label>
            <input
              required
              placeholder="O id do cliente irá aparecer aqui."
              className="input"
              value={idCliente}
              disabled
            ></input>
            <Button onClick={limparId} >Limpar o campo de ID.</Button>
          </div>
        </div>
        <div className="btn-space">
          <Button disabled>Leia o QrCode para cadastrar o cliente ou clique em concluir para gerar um novo QrCode.</Button>
          <div id="reader"></div>
          <Button variant="warning" type="submit" onClick={enviarDados}>
            Concluir
          </Button>
        </div>
      </div>
    </>
  );
};

export default CadQrCode;
