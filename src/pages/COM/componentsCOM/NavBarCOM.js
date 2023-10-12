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
            <div className="d-flex justify-content-between" style={{'width': '100%',}}>
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
                <div class="d-flex">
                <Nav style={{'padding': '0 1em'}}>
                    <Nav.Link as={Link} to="/ComissaoDashboard">Home</Nav.Link>
                    <Nav.Link as={Link} to="/CadastrarQrCode">Cadastrar Cliente</Nav.Link>
                    <Nav.Link as={Link} to="/AdicionarCredito">Adicionar Credito</Nav.Link>
                    <Nav.Link as={Link} to="/AdicionarEmpresa">Adicionar Empresa</Nav.Link>
                    <Nav.Link as={Link} to="/CadastrarProdutos">Adicionar Produto</Nav.Link>
                    <Nav.Link as={Link} to="/MonitorarEmpresas">Monitorar Empresas</Nav.Link>
                </Nav>
                <Navbar.Collapse>
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
                </div>
            </div>
            </Container>
        </Navbar>
        </>
    );
}

export default NavBarCOM;
