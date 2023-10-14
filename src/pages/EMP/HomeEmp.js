import React from "react";
import Button from "react-bootstrap/Button";
import EmptyNavBar from "../../components/EmptyNavBar";
import appLogo from "../../images/appLogo.png";
import { Link } from "react-router-dom";
import "../../styles/styleEMP.css";

const HomeEmp = () => {
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
          <h2 className="default-text">Nome da Empresa:</h2>
          <h4 className="default-text">DESCRIÇÃO DA EMPRESA:</h4>
          <h5 className="desc">XXXXXXXXXXXXXXX XXXXXXXXXXXX</h5>
        </div>
        <div className="right">
          <div>
            <h3>Faturou até o momento:</h3>
            <div className="contain-valor">
              <h4 className="default-text">R$ 1000,00</h4>
            </div>
          </div>
          <div class="contain-btn">
              <div class="nav-between-btn">
                  <Link to="/Vender">
                    <Button variant="primary">Vender</Button>{" "}
                  </Link>
                  <Link to="/Vender_LerQRCode">
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
