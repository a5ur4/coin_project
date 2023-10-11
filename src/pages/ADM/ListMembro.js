import React from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import NavBarADM from "./componentsADM/NavBarADM";
import "../../styles/general.css";
import "../../styles/styleADM.css";


const ListMembro = () => {
  return (
    <>
      <NavBarADM />
      <h1 class="title">Adicionar Membro</h1>
      <div class="container">
        <div class="content">
          <Link to='/AdicionarMembros' style={{'width': '160px'}}>
            <Button variant="warning">Cadastrar Membro</Button>{' '}
          </Link>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
            <Form.Control
              placeholder="Procurar por membro"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div class="membro-contain">
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          <Button className="membro" variant="info">Nome: XXXXX<br/>Cargo: XXXXX<br/>Empresa: XXX</Button>{' '}
          {/*  */}
        </div>
      </div>
    </>
  )
}

export default ListMembro;