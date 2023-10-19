import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../styles/navbar.css";
import appLogo from "../images/appLogo.png";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function EmptyNavBar() {

  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const cookieToken = Cookies.get('token');

  const deslogar = () => {
    Cookies.remove('token');
    navigate('/login');
};

  useEffect(() => {
    if (cookieToken) {
      const token = jwt_decode(cookieToken);
      if (token) {
        setNome(token['nome']);
      }
    }
  }, [cookieToken]);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <div class="d-flex" style={{ 'width': '100%', }}>
          <Container className="d-flex flex-row">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={appLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              VTC Bank
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Brand href="#home">
                {nome}
                <img
                  alt=""
                  src="/img/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                <button onClick={deslogar}>Sair</button>
              </Navbar.Brand>
            </Navbar.Collapse>
          </Container>
        </div>
      </Navbar>
    </>
  );
}

export default EmptyNavBar;
