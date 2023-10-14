import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import NavBarEMP from "./componentsEMP/NavBarEMP";

const Vender = () => {
  const [quantidades, setQuantidades] = useState({});

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

  const produtos = [
    {
      nome: "Produto 1",
      preco: 10.0,
    },
    {
      nome: "Produto 2",
      preco: 15.0,
    },
    {
      nome: "Produto 3",
      preco: 20.0,
    },
    {
        nome: "Produto 4",
        preco: 25.0,
    },
    {
        nome: "Produto 5",
        preco: 30.0,
    },
    {
        nome: "Produto 6",
        preco: 35.0,
    },
    {
        nome: "Produto 7",
        preco: 40.0,
    },
  ];

  const [pesquisa, setPesquisa] = useState("");

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
      <div class="contain-all-vender">
        <div class="title-vender">
            <h5>Produtos</h5>
            <h5>Valor</h5>
            <h5>Quantidade</h5>
        </div>
          <div class="content-vender-products">
            {produtosFiltrados.map((produto, index) => (
              <div key={index} className="contain-products">
                <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  placeholder="Nome do produto"
                  value={produto.nome}
                />
                <Form.Control
                  type="number"
                  style={{ textAlign: "center"}}
                  placeholder="1,00 R$"
                  value={produto.preco}
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
            R${" "}
            {produtosFiltrados
              .map(
                (produto) => (quantidades[produto.nome] || 0) * produto.preco
              )
              .reduce((total, preco) => total + preco, 0)
              .toFixed(2)}
          </h5>
        </div>
        <Button style={{'width': '25%'}} variant="warning">Prosseguir</Button>{" "}
      </div>
    </>
  );
};

export default Vender;