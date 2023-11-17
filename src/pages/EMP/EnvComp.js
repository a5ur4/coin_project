import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import NavbarEMP from "./componentsEMP/NavBarEMP";
import "../../styles/styleEMP.css";
import "../../styles/general.css";
import ComponenteProduto from "./componentsEMP/ComponenteProdutos"
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

const EnvComp = () => {

  const cookieToken = Cookies.get("token");
  const cookie = jwt_decode(cookieToken);
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const formatCurrency = (value) => {
    let val = value.replace(/\D/g, '');
    val = (val / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return val;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatCurrency(value);
    setValorTotal(formattedValue);
  };

  const formatToFloat = (value) => {
    const numericString = value.replace(/[^\d,.]/g, '');
    const normalizedValue = numericString.replace('.', '');
    const valueFloat = parseFloat(normalizedValue.replace(',', '.'));

    return valueFloat.toFixed(2);
  };

  const enviarComprovante = async () => {
    const nomeUser = cookie['nome'];
    const nomeEmpresa = cookie['empresa']

    try {
      const response = await axios.post('http://localhost:8080/php/EMP/enviarComprovante.php', {
        nomeUser: nomeUser,
        nomeProduto: nomeProduto,
        valorTotal: formatToFloat(valorTotal),
        nomeEmpresa: nomeEmpresa
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      alert(response.data.mensagem)

    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

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
            placeholder={cookie['nome']}
            className="text-enviarcom"
            disabled
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
              onChange={(e) => setNomeProduto(e.target.value)}
            />
          </div>
          <div>
            <Form.Label class="default-text">Valor total:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="R$1.00"
              className="text-enviarcom"
              value={valorTotal}
              onChange={handleChange}
            />
          </div>
        </div>
        <ComponenteProduto />
        <p>Guia: Indique o quanto você gastou na compra de algum dos seguintes produtos.</p>
        <Button variant="warning" type="submit" className="btn" onClick={enviarComprovante}>
          Concluir
        </Button>
      </div>
    </>
  );
};

export default EnvComp;
