import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; // Importe o componente Link
import appLogo from "../../../images/appLogo.png";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function NavBarADM() {

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
          <div className="d-flex justify-content-between" style={{ 'width': '100%', }}>
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src={appLogo}
                width="30"
                height="30"
                className="d-inline-block align-left"
              />{" "}
              VTC Bank
            </Navbar.Brand>
            <div class="d-flex">
              <Nav style={{ 'padding': '0 2em' }}>
                <Nav.Link as={Link} to="/AdministradorDashboard">
                  Home Admin
                </Nav.Link>
                <Nav.Link as={Link} to="/ListaMembros">
                  Lista de membros
                </Nav.Link>
                <Nav.Link as={Link} to="/ComissaoDashboard">
                  Página da Comissao
                </Nav.Link>
              </Nav>
              <Navbar.Collapse>
                <Navbar.Brand href="#home">
                  {nome}
                  <img
                    alt=""
                    src="/img/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-right"
                  />{" "}
                </Navbar.Brand>
                <button onClick={deslogar}>Sair</button>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarADM;
