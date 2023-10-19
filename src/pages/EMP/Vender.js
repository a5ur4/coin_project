import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import NavBarEMP from "./componentsEMP/NavBarEMP";
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";

const Vender = () => {
  const [quantidades, setQuantidades] = useState({});
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  const handleDecrement = (produto) => {
    const quantidade = quantidades[produto] || 0;
    if (quantidade > 0) {
      setQuantidades({
        ...quantidades,
        [produto]: quantidade - 1,
      });
    }
  };

  const handleIncrement = (produto) => {
    const quantidade = quantidades[produto] || 0;
    setQuantidades({
      ...quantidades,
      [produto]: quantidade + 1,
    });
  };

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    const listarProdutos = async () => {
      if (cookieToken) {
        const token = jwt_decode(cookieToken);
        if (token) {
          try {
            const response = await axios.post("http://localhost:8080/php/EMP/vender.php", {
              nomeEmpresa: token['empresa'],
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const produtosData = response.data.produtos;
            const formattedProdutos = produtosData.map((produto) => {
              return {
                nome: produto.name,
                preco: produto.value,
              };
            });

            setProdutos(formattedProdutos);
          } catch (error) {
            console.warn(error);
          }
        }
      }
    };

    listarProdutos();
  }, []);

  useEffect(() => {
    const total = produtos
      .map(
        (produto) => (quantidades[produto.nome] || 0) * produto.preco
      )
      .reduce((total, preco) => total + preco, 0);
    setValorTotal(total);
  }, [produtos, quantidades]);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <>
      <NavBarEMP />
      <h1 className="title">Realizar Venda</h1>
      <div className="search-product">
        <InputGroup style={{ width: "25%" }}>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Procurar por produto"
            aria-describedby="inputGroup-sizing-sm"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="contain-all-vender">
        <div className="title-vender">
          <h5>Produtos</h5>
          <h5>Valor</h5>
          <h5>Quantidade</h5>
        </div>
        <div className="content-vender-products">
          {produtosFiltrados.map((produto, index) => (
            <div key={index} className="contain-products">
              <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                placeholder="Nome do produto"
                readOnly={true}
                defaultValue={produto.nome}
              />
              <Form.Control
                type="number"
                style={{ textAlign: "center" }}
                placeholder="1,00 R$"
                readOnly={true}
                defaultValue={produto.preco}
              />

              <ButtonGroup
                className="contain-button-increase"
                aria-label="Basic example"
              >
                <Button
                  variant="secondary"
                  onClick={() => handleDecrement(produto.nome)}
                >
                  {" "}
                  -{" "}
                </Button>
                <Form.Control
                  style={{ textAlign: "center", width: "60px" }}
                  type="number"
                  placeholder="0"
                  value={quantidades[produto.nome] || 0}
                />
                <Button
                  variant="secondary"
                  onClick={() => handleIncrement(produto.nome)}
                >
                  {" "}
                  +{" "}
                </Button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="valor-total-vender">
          <h5 className="default-text">Valor total:</h5>
          <h5 className="default-text">
            R$ {valorTotal.toFixed(2)}
          </h5>
        </div>

        <Link
          to={{
            pathname: "/LerQrVenda",
          }}
          state =  {valorTotal}
          // : valorTotal.toFixed(2)
        >
          <Button variant="warning" style={{ 'width': '100%' }}>
          </Button>
            Prosseguir
        </Link>
      </div>
    </>
  );
};

export default Vender;
