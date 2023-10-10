import React from "react";
import Form from "react-bootstrap/Form";
import appLogo from "../../../images/appLogo.png";

const EmpCard = ({ nome, descricao, saldo }) => {
  return (
    <>
      <div className="cardBox">
        <img
          alt=""
          src={appLogo}
          width="60"
          height="60"
          className="d-inline-block align-top"
        />{" "}
        <br />
        <br />
        <h4>{nome}</h4>
        <h5>{descricao}</h5>
        <br />
        <Form.Control
          type="number"
          placeholder="Saldo disponível"
          value={saldo} // Use o valor passado via props
          aria-label="Disabled input example"
          disabled
          readOnly
        />
      </div>
    </>
  );
};

export default EmpCard;
