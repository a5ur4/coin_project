import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import appLogo from "../../../images/appLogo.png";

const NavBarEMP = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
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
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Vender">
              QR Code
            </Nav.Link>
            <Nav.Link as={Link} to="/Vender_LerQRCode">
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
              User.222
              <img
                alt=""
                src="/img/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarEMP;
