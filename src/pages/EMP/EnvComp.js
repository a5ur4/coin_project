import React from "react";
import Form from 'react-bootstrap/Form';
import NavbarEMP from './componentsEMP/NavBarEMP';
import '../../styles/styleEMP.css';
import '../../styles/general.css';
const EnvComp = () => {

    return (
        <>
            <NavbarEMP/>
            <h1 class="title">Enviar Comprovante</h1>
            <div class='container-emp'>
                <div>
                    <label class='default-text'>Nome:</label>
                    <Form.Control size="lg" type="text" placeholder="Digite o nome do funcionário" className='text-enviarcom'/>
                </div>
                <div class="content-emp">
                    <div class='product-container'>
                        <Form.Label class='default-text'>Produto:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Digite o nome do produto" className='text-enviarcom'/>
                    </div>
                    <div class='valor'>
                        <Form.Label class='default-text'>Valor Unitário:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="R$1,00" className='text-enviarcom' />
                    </div>
                </div>
                <div class="contain-products">
                    <div class="product">Produto 1 --------- R$ 0,00 --------- 10 Unidades</div>
                    <div class="product">Produto 2 --------- R$ 0,00 --------- 10 Unidades</div>
                    <div class="product">Produto 3 --------- R$ 0,00 --------- 10 Unidades</div>
                    <div class="product">Produto 4 --------- R$ 0,00 --------- 10 Unidades</div>
                </div>
                <div class='container-price'>
                    <div className="valor-total">
                        <p class='text-emp'>Valor Total:</p>
                    </div>
                    <div className="valor-menor">
                        <p class='text-emp'>R$ 0,00</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnvComp;
