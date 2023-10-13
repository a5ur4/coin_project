import React, { useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from "react-bootstrap/Button";
import "../../styles/general.css";
import "../../styles/styleCOM.css";
import axios from "axios";

const CadQrCode = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const enviarDados = async () => {
    console.log(nomeCliente);

    try {
      const response = await axios.post(
        "http://localhost:8080/php/COM/cadastrarQrCode.php",
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
    } catch (error) {
      console.log("Ops! Deu algum erro: ", error);
    }
  };

  return (
    <>
      <NavBarCOM />
      <div className="box">
        <h2 className="text">Cadastrar Cliente</h2>
        <div class="contain-inputs">
          <div class="content-input">
            <label className="default-text">Nome:</label>
            <input
              placeholder="Digite o nome do cliente"
              className="input"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            ></input>
          </div>
          <div class="content-input">
            <label className="default-text">Data de nascimento:</label>
            <input
              placeholder="Digite a data de nascimento do cliente"
              className="input"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            ></input>
          </div>
        </div>
        <div class="btn-space">
          <Button>Ou leia o QR Code para salvar o cliente.</Button>
          <Button variant="warning" type="submit" onSubmit={enviarDados}>
            Concluir
          </Button>
        </div>
      </div>
    </>
  );
};

export default CadQrCode;
