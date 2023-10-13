import React from "react";

const EmpCard = ({ nome, descricao, saldo }) => {
  return (
    <>
      <div className="content-cards">
        <div className="icon-emp">  </div>
        <h3> {nome} </h3>
        <p className="emp-desc"> {descricao} </p>
        <div className="valor-emp">
          <h6 className="price-emp">R$ {saldo} </h6>
        </div>
      </div>
    </>
  );
};

export default EmpCard;
