import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavBarEMP from "./componentsEMP/NavBarEMP";


const Vender = () => {
    return (
        <>
            <NavBarEMP/>
            <div>
                <h1 className="text-vendas">Realizar Venda</h1>
            </div>

            <div>
            <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                    placeholder="Procurar por produto"
                    aria-describedby="inputGroup-sizing-sm"
                />
                
            </InputGroup>
            </div>

            <div className="wrapper">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                    <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>
            
            <div className="wrapper">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                    <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>

            <div className="wrapper">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                    <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>

            <div className="wrapper">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                        <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>

            <div className="bottom">
                <div className="valorT">
                    <h5>Valor total:</h5>
                    <h5>R$ 0,00</h5>
                </div>
                <Button variant="warning">Prosseguir</Button>{' '}
            </div>
        </>
    )
}


export default Vender;