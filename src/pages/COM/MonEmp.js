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
        <h3 className="title-black">Monitorar Empresas</h3>
        <hr />
        <hr />
        <div className="cardsAlign">
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
        <div class="row">
          <div class="card green">
          <img class="image" src="." alt="imagem emp" />
            <h4>Empresa 1</h4>
            <h6 className="obra-MonEmp">Obra</h6>
            <input className="input" type="text" placeholder="R$1000"></input>

          </div>
        </div>
      </div>

    </>
  );
};

export default MonEmp;
