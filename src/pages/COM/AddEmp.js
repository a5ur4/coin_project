import React, { useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link  } from "react-router-dom";

const AddEmp = () => {
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [descricaoEmpresa, setDescricaoEmpresa] = useState("");
    const [saldoEmpresa, setSaldoEmpresa] = useState("");
  const [logoEmpresa, setLogoEmpresa] = useState(null);

  // URL da imagem selecionada
  const [logoURL, setLogoURL] = useState(null);

    const enviarDados = async (e) => {
        e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nomeEmpresa", nomeEmpresa);
      formData.append("descricaoEmpresa", descricaoEmpresa);
      formData.append("saldoEmpresa", saldoEmpresa);
      if (logoEmpresa) {
        formData.append("logoEmpresa", logoEmpresa);
      }

      const response = await axios.post(
        "http://localhost:8080/php/COM/cadastrarEmpresa.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

            // Lida com a resposta do servidor aqui, se necessário
            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            // Lida com erros de requisição aqui
            console.error("Erro na requisição:", error);
        }
    };

  const handleLogoChange = (e) => {
    const selectedLogo = e.target.files[0];
    setLogoEmpresa(selectedLogo);

    // Atualiza o URL da imagem para exibição
    setLogoURL(URL.createObjectURL(selectedLogo));
  };

    return (
        <>
            <NavBarCOM />
            <Form className="box" onSubmit={enviarDados}>
                <h3 className="text">Adicionar Empresa</h3>
        <div className="contain-inputs">
          <div class="img-form-emp">
            <Form.Group>
              <Form.Label className="default-text">Logo da empresa:</Form.Label>
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </Form.Group>
            {logoURL && (
              <img
                src={logoURL}
                alt="Logo da empresa"
                style={{ maxWidth: "100px" }}
              />
            )}
          </div>
          <Form.Group controlId="formBasicText">
            <Form.Label className="default-text">Nome da empresa:</Form.Label>
            <Form.Control
              className="input"
              type="text"
              maxLength={30}
              placeholder="Digite o nome da empresa."
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="default-text">Descrição:</Form.Label>
            <Form.Control
              className="input"
              type="text"
              maxLength={70}
              placeholder="Digite a descrição da empresa."
              value={descricaoEmpresa}
              onChange={(e) => setDescricaoEmpresa(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicNumber">
            <Form.Label className="default-text">Saldo*:</Form.Label>
            <Form.Control
              className="input"
              type="number"
              max={99999999.99}
              step="0.01"
              placeholder="Digite o saldo da empresa."
              value={saldoEmpresa}
              onChange={(e) => setSaldoEmpresa(e.target.value)}
            />
          </Form.Group>
          <Button variant="warning" type="submit" className="btn">
            Concluir
          </Button>
        </div>
                  <div className="contain-inputs">
                      <Form.Group controlId="formBasicText">
                          <Form.Label className="default-text">Nome da empresa:</Form.Label>
                          <Form.Control
                              className="input"
                              type="text"
                              maxLength={30}
                              placeholder="Digite o nome da empresa."
                              value={nomeEmpresa}
                              onChange={(e) => setNomeEmpresa(e.target.value)}
                          />
                      </Form.Group>
                      <Form.Group controlId="formBasicText">
                          <Form.Label className="default-text">Descrição:</Form.Label>
                          <Form.Control
                              className="input"
                              type="text"
                              maxLength={70}
                              placeholder="Digite a descrição da empresa."
                              value={descricaoEmpresa}
                              onChange={(e) => setDescricaoEmpresa(e.target.value)}
                          />
                      </Form.Group>
                      <Form.Group controlId="formBasicNumber">
                          <Form.Label className="default-text">Saldo*:</Form.Label>
                          <Form.Control
                              className="input"
                              type="number"
                              max={99999999.99}
                              step="0.01"
                              placeholder="Digite o saldo da empresa."
                              value={saldoEmpresa}
                              onChange={(e) => setSaldoEmpresa(e.target.value)}
                          />
                      </Form.Group>
          <Link to={{  pathname: "/ComissaoDashboard" }}>
                    <Button variant="warning" type="submit" className="btn">
                        Concluir
                    </Button>
          </Link>
                  </div>
            </Form>
        </>
    );
};

export default AddEmp;
