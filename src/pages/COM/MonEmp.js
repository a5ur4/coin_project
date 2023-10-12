import React, { useState, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import EmpCard from "./componentsCOM/EmpCard";
import axios from "axios";

const MonEmp = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/php/COM/monitorarEmpresas.php")
      .then((response) => {
        setEmpresas(response.data);
        console.log(response.data);
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
        <hr />
        <hr />
        <div className="contain-cards">
          <div className="content-cards">
            <div className="icon-emp">
            <h3>Empresa 1</h3>
            <h6>Obra</h6>
            </div>
          </div>
          <div className="content-cards">
            <div className="icon-emp">
            <h3>Empresa 1</h3>
            <h6>Obra</h6>
            </div>
          </div>
          <div className="content-cards">
            <div className="icon-emp">
            <h3>Empresa 1</h3>
            <h6>Obra</h6>
            </div>
          </div>
          <div className="content-cards">
            <div className="icon-emp">
            <h3>Empresa 1</h3>
            <h6>Obra</h6>
            </div>
          </div>
          <div className="content-cards">
            <div className="icon-emp">
            <h3>Empresa 1</h3>
            <h6>Obra</h6>
            </div>
          </div>
          <div className="content-cards">
            <div className="icon-emp">
            <h3>Empresa 1</h3>
            <h6>Obra</h6>
            </div>
          </div>

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
            <p>Nenhuma empresa encontrada.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MonEmp;
