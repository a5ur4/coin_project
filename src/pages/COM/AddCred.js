import React, { useState, useRef, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Html5QrcodeScanner } from "html5-qrcode";
import '../../styles/styleCOM.css';

const AddCred = () => {
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
                setIdCliente(result)
                verificarCliente();
                isScanning = false;
            }
        }

        function error(err) {
            try {
                throw "NotFoundException";
            } catch ( e ) {}
        }
    }, []);

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
                <Form className='btn-space'>
                    <div className="contain-inputs">
                        <Form.Group>
                            <input
                                placeholder="Digite o ID do cliente."
                                id="idManual"
                                ref={inputRef}
                                value={idCliente}
                                onChange={(e) => {
                                    setIdCliente(e.target.value);
                                    verificarCliente();
                                }}
                            />
                        </Form.Group>
                    </div>
                    {scanResult ? (
                        <div></div>
                    ) : (
                        <div id="reader"></div>
                    )}

                    <div className="caixa"></div>
                    {clienteLocalizado ? (
                        <Link to={{
                            pathname: "/LerQRCode", 
                        }}
                            state = {idCliente}
                        >
                            <Button variant="warning" type="submit">
                                Prosseguir
                            </Button>
                        </Link>
                    ) : (
                        <Button variant="warning" type="submit" disabled>
                            Prosseguir
                        </Button>
                    )}
                </Form>
            </div>
        </>
    )
}

export default AddCred;
