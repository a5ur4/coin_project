import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBarADM from "./componentsADM/NavBarADM";
import axios from "axios";
import "../../styles/styleADM.css";

const AddMembro = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [ocupacao, setOcupacao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [nomeEmpresa, setEmpresaSelecionada] = useState("");
  const [empresas, setEmpresas] = useState([]);

  const enviarDados = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/php/ADM/adicionarMembro.php",
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
  };

  useEffect(() => {
    // Reaproveitamento de código
    //
    axios
      .get(
        "http://localhost:8080/php/COM/cadastrarProduto.php?funcao=listarEmpresas"
      )

      .then((response) => {
        console.log("Resposta do servidor:", response.data);
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar empresas:", error);
      });
  }, []);

  return (
    <>
      <NavBarADM />
      <div className="box">
        <Form onSubmit={enviarDados} className="form-content">
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Nome:</Form.Label>
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
            <Form.Label>Cadastro:</Form.Label>
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
            controlId="exampleForm.ControlSelect1"
          >
            <Form.Label>Cargo:</Form.Label>
            <Form.Select
              value={ocupacao}
              onChange={(e) => setOcupacao(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Administrador">Administrador</option>
              <option value="Comissão">Comissão</option>
              <option value="Trabalhador">Trabalhador</option>
            </Form.Select>
          </Form.Group>
          {/* OCUPAÇÃO */}
          <Form.Group
            className="mb-3 form-contain"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Observação:</Form.Label>
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
            <Form.Label>Nome da empresa:</Form.Label>
            <Form.Select
              aria-label="Selecione a empresa."
              value={nomeEmpresa}
              onChange={(e) => setEmpresaSelecionada(e.target.value)}
            >
              <option>Selecione a empresa.</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.name}>
                  {empresa.name}
                </option>
              ))}
            </Form.Select>
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
