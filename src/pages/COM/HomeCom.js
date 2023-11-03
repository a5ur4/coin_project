import "../../styles/general.css";
import "../../styles/styleCOM.css";
import React from "react";
import { Link } from "react-router-dom";
import EmptyNavBar from "../../components/EmptyNavBar";
import Button from "react-bootstrap/Button";

const HomeCom = () => {
  return (
    <>
      <EmptyNavBar />
      <h1 className="title">Comissão</h1>
      <div className="center-button">
        <Link to="/CadastrarQrCode">
          <Button variant="primary">Cadastrar Cliente</Button>
        </Link>{" "}
        <Link to="/AdicionarCredito">
          <Button variant="primary">Adicionar Crédito</Button>
        </Link>{" "}
        <Link to="/AdicionarEmpresa">
          <Button variant="primary">Adicionar Empresa</Button>
        </Link>{" "}
        <Link to="/CadastrarProdutos">
          <Button variant="primary">Adicionar Produto</Button>
        </Link>{" "}
        <Link to="/removerProdutos">
          <Button variant="primary">Remover Produto</Button>
        </Link>{" "}
        <Link to="/MonitorarEmpresas">
          <Button variant="primary">Monitorar Empresas</Button>
        </Link>{" "}
      </div>
    </>
  );
};

export default HomeCom;
