import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import EmptyNavBar from "../../components/EmptyNavBar";
import appLogo from "../../images/appLogo.png";
import { Link } from "react-router-dom";
import "../../styles/styleEMP.css";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const HomeEmp = () => {

  const [nomeEmpresa, setNome] = useState("");
  const [saldo, setSaldo] = useState("");
  const [descricao, setDescricao] = useState("");
  const cookieToken = Cookies.get('token');

  const buscarInformacoes = async () => {
    try {
      const response = await axios.post("http://localhost:8080/php/EMP/homeEmp.php", {
        nomeEmpresa: nomeEmpresa,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSaldo(response.data.saldo);
      setDescricao(response.data.descricao)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (cookieToken) {
      const token = jwt_decode(cookieToken);
      console.log(token);
      if (token) {
        setNome(token['empresa']);
        buscarInformacoes();
      }
    }
  }, [cookieToken]);

  return (
    <>
      <EmptyNavBar />
      <div className="box">
        <div className="left">
          <img
            className="logo-img-home-emp"
            src={appLogo}
            alt="logo-ETE"
            width="150"
            height="150"
          />
          <h2 className="default-text">Nome da Empresa: {nomeEmpresa} </h2>
          <h4 className="default-text">DESCRIÇÃO DA EMPRESA:</h4>
          <h5 className="desc"> {descricao} </h5>
        </div>
        <div className="right">
          <div>
            <h3>Saldo atual:</h3>
            <div className="contain-valor">
              <h4 className="default-text"> {saldo} </h4>
            </div>
          </div>
          <div class="contain-btn">
            <div class="nav-between-btn">
              <Link to="/Vender">
                <Button variant="primary">Vender</Button>{" "}
              </Link>
              <Link to="/VerificarSaldo">
                <Button variant="primary">Verificar saldo do cliente</Button>{" "}
              </Link>
              <Link to="/Extrato">
                <Button variant="primary">Extrato</Button>{" "}
              </Link>
              <Link to="/EnviarComprovante">
                <Button variant="primary">Enviar comprovante de compra</Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeEmp;
