import React, { useState, useRef } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const AddCred = () => {

    const [idCliente, setIdCliente] = useState("");
    const [clienteLocalizado, setClienteLocalizado] = useState(false);
    const inputRef = useRef();

    const verificarCliente = async () => {
        const valorIdCliente = inputRef.current.value;
        try {
            const response = await axios.post("http://localhost:8080/php/COM/adicionarCredito.php", {
                idCliente: valorIdCliente,
                funcao: 'verificarClientePOST'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setClienteLocalizado(true);
            } else {
                setClienteLocalizado(false);
            }
        } catch (error) {
            setClienteLocalizado(false);
        }
    };

    return (
        <>
            <NavBarCOM />
            <div className="box">
                <h2 className="text">Adicionar Crédito</h2>
                <Form className='teste'>
                    <Form.Group className="mb-3">
                        <input
                            placeholder="Digite o ID do cliente."
                            className='input'
                            ref={inputRef}
                            value={idCliente}
                            onChange={(e) => {
                                setIdCliente(e.target.value);
                                verificarCliente();
                            }}
                        >
                        </input>
                    </Form.Group>
                    <h4>Ou leia o Qr code</h4>
                    <div className="caixa"></div>
                    {clienteLocalizado ? (
                        <Link to={{
                            pathname: "/LerQRCode",
                            }}>                            
                            <Button variant="warning" type="submit">
                                Prosseguir
                            </Button>
                        </Link>
                    ) : (
                        <Button variant="warning" type="submit" disabled >
                            Prosseguir
                        </Button>
                    )}
                </Form>
            </div>
        </>
    )
}

export default AddCred
