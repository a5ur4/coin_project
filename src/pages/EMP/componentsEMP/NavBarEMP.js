import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import appLogo from "../../../images/appLogo.png";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import userLogo from "../../../images/OIP-transformed.jpg";

const NavBarEMP = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const cookieToken = Cookies.get('token');

  useEffect(() => {
    if (cookieToken) {
      const token = jwt_decode(cookieToken);
      if (token) {
        setNome(token['nome']);
      }
    }
  }, [cookieToken]);

  const deslogar = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <div className="d-flex justify-content-between" style={{ width: "100%" }}>
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src={appLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              VTC Bank
            </Navbar.Brand>
            <div class="d-flex justify-content-end">
              <Nav className="d-flex">
                <Nav.Link as={Link} to="/EmpresaDashboard">
                  Home Empresa
                </Nav.Link>
                <Nav.Link as={Link} to="/Vender">
                  Vender
                </Nav.Link>
                <Nav.Link as={Link} to="/VerificarSaldo">
                  Saldo do cliente
                </Nav.Link>
                <Nav.Link as={Link} to="/Extrato">
                  Extrato
                </Nav.Link>
                <Nav.Link as={Link} to="/EnviarComprovante">
                  Comprovante de compra
                </Nav.Link>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand href="#home">
                  {nome}
                  <img
                    alt=""
                    src={userLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{" "}
                  <button onClick={deslogar}>Sair</button>
                </Navbar.Brand>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarEMP;
