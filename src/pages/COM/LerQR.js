import React, { useState, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios';

const LerQR = () => {

    const location = useLocation();
    const idCliente = location.state;
    const [nomeCliente, setNomeCliente] = useState("");
    const [credito, setCredito] = useState("");

    useEffect(() => {
        const getNome = async () => {
            try {
                const response = await axios.post("http://localhost:8080/php/COM/adicionarCredito.php", {
                    idCliente: idCliente,
                    funcao: 'capturarNome'
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setNomeCliente(response.data.nome);
            } catch (error) {
                console.warn(error);
            }

        };

        getNome();
    }, [idCliente]);

    const adicionarCredito = async (e) => {
        try {
            const response = await axios.post("http://localhost:8080/php/COM/adicionarCredito.php", {
                idCliente: idCliente,
                credito: credito,
                funcao: 'adicionarCredito'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert("O crédito foi adicionado com sucesso.");
            } else if (response.status == 404) {
                alert("Falha ao tentar adiconar crédito");
            }

        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <>
            <NavBarCOM />
            <br />
            <div className="boxCred">
                <h2 className='text'>Adicionar Crédito</h2>
                <br />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do cliente:</Form.Label>
                        <h5>{nomeCliente}</h5>
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label>Valor a ser adicionado:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 20,00"
                            value={credito}
                            onChange={(e) => setCredito(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Link to={{pathname: "/AdicionarCredito", }}>
                        <Button variant="primary" type="submit" onClick={adicionarCredito}>
                            Concluir
                        </Button>
                    </Link>
                </Form>
            </div>
        </>
    );
}

export default LerQR;
