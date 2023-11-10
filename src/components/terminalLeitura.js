import React, { useState, useRef, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Html5QrcodeScanner } from "html5-qrcode";

const TerminalLeitura = () => {
    const [idCliente, setIdCliente] = useState("");
    const [clienteLocalizado, setClienteLocalizado] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 250,
            },
            fps: 20,
        });


        scanner.render(success, error);

        function success(result) {
            setIdCliente(result);
            verificarCliente(result);
        }

        function error(err) {
            console.log(err.response.data)
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = idCliente;
        }
    }, [idCliente]);

    const mostrarSaldo = async () => {

        try {
            const response = await axios.post("http://localhost:8080/php/EMP/verificarSaldo.php", {
                idCliente: idCliente
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            if (response.status === 200) {
                let nome = response.data.name;
                let saldo = response.data.saldo;
                const message = `Nome do cliente: ${nome}\nSaldo: do cliente R$${saldo}`;
                alert(message);
                setIdCliente('');
            } else if (response.status === 404) {
                console.log("Cliente não encontrado.")
            }
        } catch (error) {
            console.log('Erro diferenciado:', error);
        }
    }

    const verificarCliente = async (valorIdCliente) => {
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
            <h1 className="title">Terminal de leitura de saldo</h1>
            <div className='box'>
                <CloseButton className="close-btn" />
                <Form.Group>
                    <input
                        className='text-form'
                        style={{ 'width': 385 }}
                        type="text"
                        placeholder="Digite o ID do cliente."
                        ref={inputRef}
                        onChange={(e) => {
                            setIdCliente(e.target.value);
                            verificarCliente(e.target.value);
                        }}
                    />
                </Form.Group>
                <div className="btn-space">

                    <div id="reader"></div>

                    {clienteLocalizado ? (
                        <Button variant="warning" type="submit" onClick={mostrarSaldo} style={{ 'width': 385 }} >
                            Prosseguir
                        </Button>
                    ) : (
                        <Button variant="warning" type="submit" disabled style={{ 'width': 385 }} >
                            Prosseguir
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default TerminalLeitura;
