import React, { useState } from "react";


const EmpCard = ({ nome, descricao, saldo }) => {
  const maxCaracteresExibidos = 20;
  const [mostrarMais, setMostrarMais] = useState(false);

  const toggleMostrarMais = () => {
    setMostrarMais(!mostrarMais);
  };


  return (
    <>
      <div className="content-cards">
        <div className="icon-emp"> </div>
        <h4> {nome} </h4>
        <div className="valor-emp">
          <h6 className="price-emp">R$ {saldo} </h6>
        </div>
        <p className="emp-desc">
          Descrição da empresa: <br></br>
          {descricao.length > maxCaracteresExibidos && !mostrarMais
            ? `${descricao.slice(0, maxCaracteresExibidos)}...`
            : descricao}
          {descricao.length > maxCaracteresExibidos && (
            <button className="button-ler-mais" onClick={toggleMostrarMais}>
              {mostrarMais ? "Mostrar Menos" : "Ler Mais"}
            </button>
          )}
        </p>
      </div>
    </>
  );
};

export default EmpCard;
