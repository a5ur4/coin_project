import React from "react";
import EmptyNavBar from "../../components/EmptyNavBar";
import { Link } from "react-router-dom";
import "../../styles/general.css";

const HomeADM = () => {
  return (
    <>
      <EmptyNavBar />
      <h1 className="title">Administrador</h1>
      <Link to="/ListaMembros" style={{'textDecoration': 'none'}}>
        <button className="button">Lista de Membro</button>
      </Link>
      <Link to="/ComissaoDashboard" style={{'textDecoration': 'none'}}>
        <button className="button">Página da comissão</button>
      </Link>
    </>
  );
};

export default HomeADM;
