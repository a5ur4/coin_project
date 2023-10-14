import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import appLogo from "./images/appLogo.png";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                const decodedToken = jwt_decode(token);
                const cargoUsuario = decodedToken.cargo;

                if (cargoUsuario === 'admin') {
                    console.log("Foi achado um administrador");
                } else if (cargoUsuario === 'commission') {
                    console.log("Foi achado um comissionista");
                } else if (cargoUsuario === 'worker') {
                    console.log("Foi achado um trabalhador");
                } else {
                    // Redirecione para uma página de erro ou faça algo apropriado
                }

                console.log("chegamos aqui e nada aconteceu");
            }
        } catch (err) {
            console.log("Usuário não encontrado.");
        }
    }


    return (
        <div className='form_box'>
            <img
                alt=""
                src={appLogo}
                width="60"
                height="60"
                className="d-inline-block align-top"
            />{' '}
            <br />
            <br />
            <h2>Acesse sua conta</h2>
            <br />
            <Form className='login_form'>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        maxLength={30}
                        placeholder="Digite seu usuário."
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        maxLength={30}
                        placeholder="Password"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={verificarLogin}>
                    Entrar
                </Button>
                <br />
                <Form.Text className="text-muted">
                    Se for sua primeira vez use a senha padrão.
                </Form.Text>
            </Form>
        </div>
    );
}

export default Login;
