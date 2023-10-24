import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie"; // Importe a biblioteca js-cookies

function ModalConsentimentoCookies({ visivel, aoFechar, aoAceitar, aoRecusar }) {
  const handleAceitar = () => {
    Cookies.set("cookiesAceitos", "true", { expires: 7 });
    aoAceitar();
  };

  const handleRecusar = () => {
    Cookies.set("cookiesAceitos", "false", { expires: 7 });
    aoRecusar();
  };

  return (
    <Modal show={visivel} onHide={aoFechar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Política de Cookies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Nós usamos cookies para melhorar a sua experiência.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleRecusar}>
          Recusar
        </Button>
        <Button variant="primary" onClick={handleAceitar}>
          Aceitar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConsentimentoCookies;
