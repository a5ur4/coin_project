import React from "react";

const EmpCard = ({ nome, descricao, saldo }) => {
  return (
    <>
      <div className="cardBox">
        <div class="row">
          <div class="card green">
            <img class="image" src="." alt="imagem emp" />
            <h4>{nome}</h4>
            <h6 className="obra-MonEmp">{descricao}</h6>
            <div className="input">Saldo atual: {saldo}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpCard;
