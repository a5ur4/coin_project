import React, { useState, useRef, useEffect } from "react";
import NavBarEMP from "./componentsEMP/NavBarEMP";
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Html5QrcodeScanner } from "html5-qrcode";
import { Link, useLocation } from 'react-router-dom';

const LerQrVenda = () => {
    const location = useLocation();
    const valorTotal = location.state;
    const [idCliente, setIdCliente] = useState("");
    const [clienteLocalizado, setClienteLocalizado] = useState(false);
    const inputRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 250,
            },
            fps: 20,
        });

        let isScanning = true;

        scanner.render(success, error);

        function success(result) {
            if (isScanning) {
                scanner.clear();
                setScanResult(result);
                setIdCliente(result);
                verificarCliente(result);
                isScanning = false;
            }
        }

        function error(err) {
            try {
                throw "NotFoundException";
            } catch (e) { }
        }
    }, []);

    const realizarVenda = async () => {

        try {
            const response = await axios.post("http://localhost:8080/php/EMP/LerQrVenda.php", {
                idCliente: idCliente,
                valorTotal: valorTotal
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(response)
            alert(response.data.mensagem);

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
            <NavBarEMP />
            <h1 className="title">Realizar venda</h1>
            <div className='box'>
                <CloseButton className="close-btn" />
                <Form.Group>
                    <input
                        className='text-form'
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
                    {scanResult ? (
                        <div></div>
                    ) : (
                        <div id="reader"></div>
                    )}

                    {clienteLocalizado ? (
                        <Link to={{
                            pathname: "/Vender",
                        }}>
                            <Button variant="warning" type="submit" style={{ 'width': '25%' }} onClick={realizarVenda}>
                                Confirmar venda
                            </Button>
                        </Link>
                    ) : (
                        <Button variant="warning" type="submit" disabled >
                            Confirmar venda
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default LerQrVenda;
