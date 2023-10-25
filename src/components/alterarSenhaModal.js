import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function AlterarSenhaModal(props) {
  const [novaSenha, setNovaSenha] = useState('');
  const usuario = props.login;
  const navigate = useNavigate();
  const cookieToken = jwt_decode(Cookies.get("token"));

  const handleClose = () => {
    props.onHide();
  };

  const redirecionar = () => {
    if (cookieToken["cargo"] === "admin") {
      navigate("/AdministradorDashboard");
    } else if (cookieToken["cargo"] === "commission") {
      navigate("/ComissaoDashboard");
    } else if (cookieToken["cargo"] === "worker") {
      navigate("/EmpresaDashboard");
    }
  }

  const handleSalvar = async () => {
    try {
    const response = await axios.post("http://localhost:8080/php/alterarSenhaModal.php", {
      usuario: usuario,
      novaSenha: novaSenha
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    })
      if (response.status === 200) {
        alert(response.data.message);
        redirecionar();
      } else {
        alert("Erro não previsto. Tente novamente.")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alterar Senha</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Seu usuário: {usuario} </p>
        <p>Digite a nova senha:</p>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <p>Esse processo só é feito uma vez.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSalvar}>
          Salvar Senha
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlterarSenhaModal;
