import React, { useEffect, useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/general.css";
import "../../styles/styleCOM.css";
import axios from "axios";

const CadProd = () => {
  const [empresas, setEmpresas] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [nomeEmpresa, setEmpresaSelecionada] = useState("");

  const cadastrarProduto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/php/COM/cadastrarProduto.php",
        {
          nomeProduto: nomeProduto,
          valorProduto: valorProduto,
          nomeEmpresa: nomeEmpresa,
          funcao: "cadastrarProdutoPOST",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Produto cadastrado com sucesso!");
        setNomeProduto('');
        setValorProduto('');
        setEmpresaSelecionada('');
      } else {
        alert("Falha para cadastrar produto!");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/php/COM/cadastrarProduto.php?funcao=listarEmpresas"
      )

      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        alert("Erro interno no servidor, por favor, atualize a página.")
      });
  }, []);

  return (
    <>
      <NavBarCOM />
      <div className="box">
        <h3 className="text">Cadastrar Produto</h3>
        <Form onSubmit={cadastrarProduto}>
          <div className="contain-inputs">
            <Form.Group controlId="formBasicText">
              <Form.Label className="default-text">Nome do produto:</Form.Label>
              <Form.Control
                required
                type="text"
                className="input"
                maxLength={30}
                placeholder="Digite o nome do produto."
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicNumber">
              <Form.Label className="default-text">
                Valor do produto:
              </Form.Label>
              <Form.Control
                type="number"
                className="input"
                max={9999.99}
                step="0.01"
                placeholder="Digite o valor do produto."
                required
                value={valorProduto}
                onChange={(e) => setValorProduto(e.target.value)}
              />
            </Form.Group>
            <Form.Label className="default-text">Nome da empresa:</Form.Label>
            <Form.Select
              required
              aria-label="Selecione a empresa."
              className="input"
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

          </div>
          <div className="btn-space">
            <Button variant="warning" type="submit">
              Concluir
            </Button>

          </div>
        </Form>
      </div>
    </>
  );
};

export default CadProd;
