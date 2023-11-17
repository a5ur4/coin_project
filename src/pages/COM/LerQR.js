import React, { useState, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const LerQR = () => {

    const location = useLocation();
    const idCliente = location.state;
    const [nomeCliente, setNomeCliente] = useState("");
    const [credito, setCredito] = useState("");

    const formatCurrency = (value) => {
        let val = value.replace(/\D/g, '');
        val = (val / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return val;
    };

    const handleChange = (e) => {
        const inputCredit = e.target.value;
        const formattedCredit = formatCurrency(inputCredit);
        setCredito(formattedCredit);
    };

    const formatToFloat = (value) => {
        const numericString = value.replace(/[^\d,.]/g, '');
        const normalizedValue = numericString.replace('.', '');
        const valueFloat = parseFloat(normalizedValue.replace(',', '.'));
    
        return valueFloat.toFixed(2);
    };

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
                credito: formatToFloat(credito),
                funcao: 'adicionarCredito'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert("O crédito foi adicionado com sucesso.");
            } else if (response.status === 404) {
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
            <div className="box">
                <h2 className='text'>Adicionar Crédito</h2>
                <Form>
                    <Form.Group className="default-text">
                        <Form.Label>Nome do cliente:</Form.Label>
                        <h5 className='text-name'>{nomeCliente}</h5>
                    </Form.Group>
                    <br />
                    <Form.Group className="default-text">
                        <Form.Label>Valor a ser adicionado:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 20,00"
                            value={credito}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Link to={{ pathname: "/AdicionarCredito", }}>
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
