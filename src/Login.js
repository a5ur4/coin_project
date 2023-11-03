import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import appLogo from "./images/appLogo.png";
import "../src/styles/Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import AlterarSenhaModal from "./components/alterarSenhaModal";

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const navigate = useNavigate();

  const verificarLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/php/login.php",
        {
          login: login,
          senha: senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;

      Cookies.set("token", token, { expires: 7 });
      const cookieToken = jwt_decode(Cookies.get("token"));
      const senhaAlterar = (response.data.senhaAlterar)

      console.log(senhaAlterar)
      if (senhaAlterar) {
        setMostrarModalSenha(true)
      } else {
        if (cookieToken["cargo"] === "admin") {
          navigate("/AdministradorDashboard");
        } else if (cookieToken["cargo"] === "commission") {
          navigate("/ComissaoDashboard");
        } else if (cookieToken["cargo"] === "worker") {
          navigate("/EmpresaDashboard");
        }
      }

    } catch (err) {
      const mensagemResposta = err.response.data.message;
      if (mensagemResposta === "Dados de login ausentes.") {
        alert("Ops! Complete todos os campos para prosseguir.")
      } else if (mensagemResposta === "Credenciais invalidas.") {
        alert("Ops! Não existe nenhum usuário com essas credenciais")
      } else {
        alert("Algo inesperado aconteceu. Por favor, tente novamente.")
      }
    }
  };

  const handleCheckboxChange = () => {
    setTermosAceitos(!termosAceitos);
  };

  return (
    <div className="logo-login">
      <img alt="" src={appLogo} width="80" height="80" />{" "}
      <h2 class="title">Acesse sua conta</h2>
      <Form className="box">
        <Form.Group className="default-text" controlId="formBasicText">
          <Form.Label>Usuário:</Form.Label>
          <Form.Control
            className="input"
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
            className="input"
            required
            type="password"
            maxLength={30}
            placeholder="Digite sua senha."
            onChange={(e) => setSenha(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="termosCheckbox">
          <Form.Check
            type="checkbox"
            label={
              <>
                Li e concordo com os{" "}
                <Link to="/termos">Termos de uso</Link>
              </>
            }
            checked={termosAceitos}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <div
          style={{
            margin: "1rem 0",
            display: "flex",
            justifyContent: "center",
          }}>

          <Button
            className="btn-login"
            variant="warning"
            type="submit"
            onClick={verificarLogin}
            disabled={!termosAceitos} // Desabilita o botão se os termos não foram aceitos
          >
            Entrar
          </Button>
        </div>
        {mostrarModalSenha && (
          <AlterarSenhaModal
            show={true}
            onHide={() => setMostrarModalSenha(false)}
            login={login}
          />
        )}
        <Form.Text className="default-text">
          Se for sua primeira vez use a senha padrão.
          Acessar o <Link to='/terminalLeitura' >terminal de leitura </Link>
        </Form.Text>
      </Form>
    </div>
  );
}

export default Login;
