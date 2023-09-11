import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Importe o componente Link
import appLogo from '../../../images/appLogo.png';

function NavBarCOM() {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand as={Link} to="/ComissaoDashboard">
            <img
                alt=""
                src={appLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            VTC Bank
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/ComissaoDashboard">Home</Nav.Link>
                <Nav.Link as={Link} to="/CadastrarQrCode">QR Code</Nav.Link>
                <Nav.Link as={Link} to="/AdicionarCredito">Add Credito</Nav.Link>
                <Nav.Link as={Link} to="/AdicionarEmpresa">Add Empresa</Nav.Link>
                <Nav.Link as={Link} to="/CadastrarProdutos">Add Produto</Nav.Link>
                <Nav.Link as={Link} to="/MonitorarEmpresas">Monitorar Empresas</Nav.Link>
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
                    />{' '}
                </Navbar.Brand>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}

export default NavBarCOM;
