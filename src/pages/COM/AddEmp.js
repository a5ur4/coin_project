    import React, { useState } from "react";
    import NavBarCOM from "./componentsCOM/NavBarCOM";
    import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    import './StyleCOM.css';
    import axios from 'axios';

    const AddEmp = () => {

        const [nomeEmpresa, setNomeEmpresa] = useState("");
        const [descricaoEmpresa, setDescricaoEmpresa] = useState("");
        const [saldoEmpresa, setSaldoEmpresa] = useState("")

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await axios.post("http://localhost:8080/php/COM/cadastrarEmpresa.php", {
                    nomeEmpresa: nomeEmpresa,
                    descricaoEmpresa: descricaoEmpresa,
                    saldoEmpresa: saldoEmpresa,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
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
                <br />
                <Form className='boxCred' onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicText">
                        <Form.Label>Nome da empresa:</Form.Label>
                        <br></br>
                        <Form.Control
                            type="text"
                            className="input"
                            maxLength={30}
                            placeholder="Digite o nome da empresa."
                            value={nomeEmpresa}
                            onChange={(e) => setNomeEmpresa(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Descrição:</Form.Label>
                        <br></br>
                        <Form.Control
                            type="text"
                            className="input"
                            maxLength={70}
                            placeholder="Digite a descrição da empresa."
                            value={descricaoEmpresa}
                            onChange={(e) => setDescricaoEmpresa(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicNumber">
                        <Form.Label>Saldo*:</Form.Label>
                        <Form.Control
                            type="number"
                            className="input"
                            max={99999999.99}
                            step="0.01"
                            placeholder="Digite o saldo da empresa."
                            value={saldoEmpresa}
                            onChange={(e) => setSaldoEmpresa(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="submit">
                        Concluir
                    </Button>
                </Form>
            </>
        )
    }

    export default AddEmp;
