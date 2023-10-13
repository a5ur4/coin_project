import React from "react";
import NavBarEMP from "./componentsEMP/NavBarEMP";
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

const Vender_Read_QRCODE = () => {
    return (
        <>
            <NavBarEMP/>
            <div class='box'>
                <CloseButton className="close-btn" />
                <Form.Control className='text-form' type="text" placeholder="Digite o ID do cliente" />
                <div class="btn-space">
                    <Button>Ou leia o QR Code para salvar o cliente.</Button>
                    <Button variant="warning" type="submit">
                    Concluir
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Vender_Read_QRCODE