import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import appLogo from "./images/appLogo.png";
import "../src/styles/Login.css";
import axios from 'axios';

function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');


    const verificarLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/php/login.php', {
                login: login,
                senha: senha
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
        } catch (err) {
            console.log("Usuário não encontrado.");
        }

        console.log("Processo encerrado");
    }


    return (
        <div className="logo-login"
        >
            <img
                alt=""
                src={appLogo}
                width="80"
                height="80"
            />{' '}
            <h2 class='title'>Acesse sua conta</h2>
            <Form className='box'>
                <Form.Group className="default-text" controlId="formBasicText">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control
                        className='input'
                        required
                        type="text"
                        maxLength={30}
                        placeholder="Digite seu usuário."
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="default-text" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        className='input'
                        required
                        type="password"
                        maxLength={30}
                        placeholder="Digite sua senha."
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>
                <Button class='btn-login' variant="warning" type="submit" onClick={verificarLogin}>
                    Entrar
                </Button>
                <Form.Text className="default-text">
                    Se for sua primeira vez use a senha padrão.
                </Form.Text>
            </Form>
        </div>
    );
}

export default Login;
