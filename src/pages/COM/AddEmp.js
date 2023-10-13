import React, { useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from 'react-router-dom';

const AddEmp = () => {
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [descricaoEmpresa, setDescricaoEmpresa] = useState("");
    const [saldoEmpresa, setSaldoEmpresa] = useState("");

    const enviarDados = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/php/COM/cadastrarEmpresa.php",
                {
                    nomeEmpresa: nomeEmpresa,
                    descricaoEmpresa: descricaoEmpresa,
                    saldoEmpresa: saldoEmpresa,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
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

    return (
        <>
            <NavBarCOM />
            <Form className="box" onSubmit={enviarDados}>
                <h3 className="text">Adicionar Empresa</h3>
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
                    <Link to={{ pathname: "/ComissaoDashboard", }}>
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
