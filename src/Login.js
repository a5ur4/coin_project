import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import appLogo from "./images/appLogo.png";
import "../src/styles/Login.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    

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
            const token = response.data.token;

            Cookies.set('token', token, { expires: 7 });
            const cookieToken = jwt_decode(Cookies.get('token'));

            if (cookieToken['cargo'] == "admin"){
                navigate("/administradorDashboard");
            } else if (cookieToken['cargo'] == "commission") {
                navigate("/comissaoDashboard");
            } else if (cookieToken['cargo'] == "worker") {
                navigate("empresaDashboard");
            }

        } catch (err) {
            console.log("Usuário não encontrado.");
        }

    }


    return (
        <div className="logo-login">
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
                <div style={{ 'margin': '1rem 0', 'display': 'flex', 'justifyContent': 'center' }}>
                    <Button class='btn-login' variant="warning" type="submit" onClick={verificarLogin}>
                        Entrar
                    </Button>
                </div>
                <Form.Text className="default-text">
                    Se for sua primeira vez use a senha padrão.
                </Form.Text>
            </Form>
        </div>
    );
}

export default Login;
