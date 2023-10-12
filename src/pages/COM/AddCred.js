import React, { useState, useRef } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Webcam from "react-webcam";

const AddCred = () => {
    const [idCliente, setIdCliente] = useState("");
    const [clienteLocalizado, setClienteLocalizado] = useState(false);
    const inputRef = useRef(null);
    const [cameraAtiva, setCameraAtiva] = useState(false);
    const webcamRef = useRef(null);

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

    const handleIniciarCamera = () => {
        setCameraAtiva(true);
    };

    const handleCapturarQRCode = () => {
        const imagem = webcamRef.current.getScreenshot();
        console.log("Foto capturada com sucesso!");
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
                        />
                    </Form.Group>
                    {cameraAtiva ? (
                        <div>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                    width: 250, // Largura desejada
                                    height: 150, // Altura desejada
                                }}
                            />
                            <Button onClick={handleCapturarQRCode}>
                                Capturar QR Code
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleIniciarCamera}>
                            Iniciar a Câmera para Escanear QR Code
                        </Button>
                    )}

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
