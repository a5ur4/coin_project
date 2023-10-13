import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import NavBarADM from "./componentsADM/NavBarADM";
import "../../styles/general.css";
import "../../styles/styleADM.css";
import MembroCard from "./componentsADM/membroCard";
import axios from 'axios';


const ListMembro = () => {
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/php/ADM/listarMembros.php")
      .then((response) => {
        setMembros(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar empresas:", error);
      });
  }, []);

  console.log(membros);

  return (
    <>
      <NavBarADM />
      <h1 className="title">Adicionar Membro</h1>
      <div className="container">
        <div className="content">
          <Link to='/AdicionarMembros' style={{ 'width': '160px' }}>
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
        <div className="membro-contain">
          {Array.isArray(membros) && membros.length > 0 ? (
            membros.map((membros) => (
              <MembroCard
                key={membros.id}
                nome={membros.name}
                cargo={membros.occupation}
                empresa={membros.FK_user_enterprise}
              />
            ))
          ) : (
            <p>Nenhum membro encontrada.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default ListMembro;