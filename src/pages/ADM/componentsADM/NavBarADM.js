import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; // Importe o componente Link
import appLogo from "../../../images/appLogo.png";

function NavBarADM() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <div class="d-flex">
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src={appLogo}
                width="30"
                height="30"
                className="d-inline-block align-center"
              />{" "}
              VTC Bank
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
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
                User.222
                <img
                  alt=""
                  src="/img/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-center"
                />{" "}
              </Navbar.Brand>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarADM;
