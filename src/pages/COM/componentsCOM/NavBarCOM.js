import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import appLogo from '../../../images/appLogo.png';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import userLogo from "../../../images/OIP-transformed.jpg";

function NavBarCOM() {
    const navigate = useNavigate();

    const [administrador, setAdministrador] = useState(false);
    const [nome, setNome] = useState("");
    const cookieToken = Cookies.get('token');

    useEffect(() => {
        if (cookieToken) {
            const token = jwt_decode(cookieToken);
            setNome(token['nome']);

            if (token['cargo'] === 'admin') {
                setAdministrador(true);

            } else {
                setAdministrador(false);

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
                        <div className="d-flex">
                            <Nav style={{ 'padding': '0 1em' }}>
                                {administrador && <Nav.Link as={Link} to="/AdministradorDashboard">Home Admin</Nav.Link>}
                                <Nav.Link as={Link} to="/ComissaoDashboard">Home Comissão</Nav.Link>
                                <Nav.Link as={Link} to="/CadastrarQrCode">Cadastrar Cliente</Nav.Link>
                                <Nav.Link as={Link} to="/AdicionarCredito">Adicionar Credito</Nav.Link>
                                <Nav.Link as={Link} to="/AdicionarEmpresa">Adicionar Empresa</Nav.Link>
                                <Nav.Link as={Link} to="/CadastrarProdutos">Adicionar Produto</Nav.Link>
                                <Nav.Link as={Link} to="/RemoverProdutos">Remover Produto</Nav.Link>
                                <Nav.Link as={Link} to="/MonitorarEmpresas">Monitorar Empresas</Nav.Link>
                            </Nav>
                            <Navbar.Collapse>
                                <Navbar.Brand href="#home">
                                    {nome}
                                    <img
                                        alt=""
                                        src={userLogo}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                    />{' '}
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

export default NavBarCOM;
