import React from "react";
import Form from 'react-bootstrap/Form';
import NavbarEMP from './componentsEMP/NavBarEMP';
import '../../styles/styleEMP.css';
import '../../styles/general.css';
const EnvComp = () => {

    return (
        <>
            <NavbarEMP/>
            <h1 className="text-comp">Enviar Comprovante</h1>

            <div className='td'>
                <div className='nome'>
                    <label>Nome:</label>
                    <Form.Control size="lg" type="text" placeholder="Digite o nome do funcionário" />
                </div>
                <div className="contentEMP">
                    <div className='produto'>
                        <Form.Label >Produto:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Digite o nome do produto" />
                    </div>
                    <div className='valor'>
                        <Form.Label >Valor Unitário:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="R$1,00" />
                    </div>
                    <div className='quantidade'>
                        <Form.Label >Quantidade:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="10" />
                    </div>
                </div>
                <div className="contain-products">
                    <div className="product">Produto 1</div>
                    <div className="product">Produto 2</div>
                    <div className="product"></div>
                    <div className="product"></div>
                </div>
            </div>
        </>
    )
}

export default EnvComp;
