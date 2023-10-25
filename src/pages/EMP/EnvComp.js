import React from "react";
import Form from "react-bootstrap/Form";
import NavbarEMP from "./componentsEMP/NavBarEMP";
import "../../styles/styleEMP.css";
import "../../styles/general.css";
const EnvComp = () => {
  return (
    <>
      <NavbarEMP />
      <h1 class="title">Enviar Comprovante</h1>
      <div class="container-emp">
        <div>
          <label class="default-text">Nome:</label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Digite o nome do funcionário"
            className="text-enviarcom"
          />
        </div>
        <div class="content-emp">
          <div>
            <Form.Label class="default-text">Produto:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Digite o nome do produto"
              className="text-enviarcom"
            />
          </div>
          <div>
            <Form.Label class="default-text">Valor:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="R$1,00"
              className="text-enviarcom"
            />
          </div>
        </div>
        <div class="contain-products-enviar-comprovante">
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
          <div className="info-products-enviar-comprovante">
            <h6 className="product-name">Produto 1</h6>
            <h6 className="product-value">R$ 10</h6>
            <h6 className="product-amount">10 Unidades</h6>
          </div>
        </div>
        <div class="container-price">
          <div class="contain-valor-enviar-comprovante">
            <h6 className="default-text">Valor total: R$</h6>
            <h6 className="valor-total-value default-text">00</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvComp;
