import React from "react";
import "../../../styles/general.css";
import "../../../styles/styleADM.css";
import Button from 'react-bootstrap/Button';

const MembroCard = ({ nome, cargo, empresa }) => {
    return (
        <Button className="membro" variant="info">Nome: {nome} <br/>Cargo: {cargo} <br/>Empresa: {empresa} </Button>
    )
}

export default MembroCard;