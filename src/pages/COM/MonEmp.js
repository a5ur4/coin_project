import React, { useState, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import EmpCard from "./componentsCOM/EmpCard";
import "../../styles/general.css";
import axios from "axios";

const MonEmp = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/php/COM/monitorarEmpresas.php")
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar empresas:", error);
      });
  }, []);

  return (
    <>
      <NavBarCOM />
      <div className="ComBox">
        <h3 className="title">Monitorar Empresas</h3>
        <div className="contain-cards">        
          {Array.isArray(empresas) && empresas.length > 0 ? (
            empresas.map((empresa) => (
              <EmpCard
                key={empresa.id}
                nome={empresa.name}
                saldo={empresa.balance}
                descricao={empresa.description}
              />
            ))
          ) : (
            <p style={{'color': 'black'}}>Nenhuma empresa encontrada.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MonEmp;
