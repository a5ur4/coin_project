import React from "react";
import NavBarEMP from "./componentsEMP/NavBarEMP";
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

const Vender_Read_QRCODE = () => {
    return (
        <>
            <NavBarEMP/>
            <div className='box'>
                <br />
                <CloseButton className="close-button" />
                <Form.Control className='text' type="text" placeholder="Digite o ID do cliente" />
                <Form.Label className='text_label'>Ou Leia o QR CODE:</Form.Label>
                <Button variant="warning" className='war'>Prosseguir</Button>{' '}
            </div>
        </>
    )
}

export default Vender_Read_QRCODE