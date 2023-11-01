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

            if (response.data.mensagem == "Empresa cadastrada com sucesso.") {
                alert(response.data.mensagem);
                setNomeEmpresa('');
                setDescricaoEmpresa('');
                setSaldoEmpresa('');
            } else {
                alert(response.data.mensagem);
            }
        } catch (error) {
            alert(error.response.data.mensagem)
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
                            required
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
                            required
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
                            required
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
            </Form>
        </>
    );
};

export default AddEmp;