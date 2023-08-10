import React from "react";
import EmptyNavBar from "../../components/EmptyNavBar";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './styles/vender.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const Vender = () => {
    return (
        <>
            <EmptyNavBar/>
            <div class="ComBox">
                <h1>Realizar Venda</h1>
            </div>

            <div>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm"></InputGroup.Text>
                <Form.Control
                    placeholder="Procurar por produto"
                    aria-describedby="inputGroup-sizing-sm"
                />
                
            </InputGroup>
            </div>

            <div class="tet">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                    <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>
            
            <div class="tet">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                    <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>

            <div class="tet">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                    <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>

            <div class="tet">
                <Form.Control type="text" placeholder="Nome do produto" /> 
                <Form.Control type="number" placeholder="1,00 R$" />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary"> - </Button>
                    <Form.Control type="number" placeholder="0" />
                        <Button variant="secondary"> + </Button>
                </ButtonGroup>
            </div>

            <div className="bottom">
                <div class="valorT">
                    <h5>Valor total:</h5>
                    <h5>R$ 0,00</h5>
                </div>
                <Button variant="warning">Prosseguir</Button>{' '}
            </div>

            <div className="war"> 
            </div>

        </>
    )
}


export default Vender;