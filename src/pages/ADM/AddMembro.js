import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/AddMembro.css";
import NavBarADM from "./componentsADM/NavBarADM";
import axios from "axios";

const AddMembro = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [ocupacao, setOcupacao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");

  const enviarDados = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/backend/ADM/adicionarMembro.php",
        {
          nome: nome,
          login: login,
          ocupacao: ocupacao,
          observacao: observacao,
          nomeEmpresa: nomeEmpresa,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    console.log("TRY ou CATCH realizado.");
  };

  return (
    <>
      <NavBarADM />
      <div className="box">
        <Form method="POST" onSubmit={enviarDados} className="form-content">
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>* Nome:</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              className="form-control"
              placeholder="Digite o nome do funcionário."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
          {/* NOME */}
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>* Cadastro:</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              className="form-control"
              placeholder="Digite o cadastro do funcionário."
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>
          {/* CADASTRO */}
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>* Ocupação:</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              className="form-control"
              placeholder="Digite a ocupação do funcionário."
              value={ocupacao}
              onChange={(e) => setOcupacao(e.target.value)}
            />
          </Form.Group>
          {/* OCUPAÇÃO */}
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>* Observação:</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              maxLength={200}
              className="form-control"
              placeholder="Digite uma observação."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </Form.Group>
          {/* OBSERVAÇÃO */}
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>* Nome da empresa:</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              maxLength={20}
              className="form-control"
              placeholder="Digite a empresa a qual o funcionário pertence."
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
            />
          </Form.Group>
          {/* NOME-EMPRESA */}
          <div class="button">
            <Button type="SUBMIT" variant="warning">
              Cadastrar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddMembro;
