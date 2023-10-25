import React, { useState, useRef, useEffect } from "react";
import NavBarEMP from "./componentsEMP/NavBarEMP";
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Html5QrcodeScanner } from "html5-qrcode";
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const LerQrVenda = () => {
    const location = useLocation();
    const valorTotal = location.state;
    const [idCliente, setIdCliente] = useState("");
    const [clienteLocalizado, setClienteLocalizado] = useState(false);
    const inputRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);
    const cookieToken = Cookies.get('token');
    const [senhaCliente, setSenhaCliente] = useState("");

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 250,
            },
            fps: 15,
            statusMessages: {
                notMatched: "Aponte para um código QR",
                permissionDenied: "Permissão da câmera negada",
            },
        });

        scanner.render(success, error);

        function success(result) {
            setIdCliente(result);
            setScanResult(result);
            verificarCliente(result);
            console.log(result);
        }

        function error(err) {
            try {
                throw "NotFoundException";
            } catch (e) { }
        }
    }, []);

    const realizarVenda = async () => {
        const token = jwt_decode(cookieToken);
        if (token) {
            try {
                const response = await axios.post("http://localhost:8080/php/EMP/LerQrVenda.php", {
                    idCliente: idCliente,
                    senhaCliente: senhaCliente,
                    valorTotal: valorTotal,
                    usuario: token['nome'],
                    empresa: token['empresa']
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                alert(response.data.mensagem);

            } catch (error) {
                console.log(error);
            }
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
                <Form.Group>
                    <div class="contain-input-LerQR">
                        <input
                            className='text-form input'
                            type="text"
                            placeholder="Digite o ID do cliente."
                            ref={inputRef}
                            value={idCliente}
                            onChange={(e) => {
                                setIdCliente(e.target.value);
                                verificarCliente(e.target.value);
                            }}
                        />
                    </div>

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
                            <Button variant="warning" type="submit" onClick={realizarVenda}>
                                Confirmar venda
                            </Button>
                        </Link>
                    ) : (
                        <Button variant="warning"  type="submit" disabled >
                            Confirmar venda
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default LerQrVenda;
