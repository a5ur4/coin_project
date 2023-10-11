import React from "react";
import Button from 'react-bootstrap/Button';
import EmptyNavBar from "../../components/EmptyNavBar";
import appLogo from "../../images/appLogo.png";
import { Link } from "react-router-dom";

const HomeEmp = () => {
    return (
        <>
            <EmptyNavBar/>
            <div className="wrapper">
                <div className="left">
                    <img src={appLogo} alt="logo-ETE"/>
                   
                    <h2>Nome da Empresa:</h2>
                    <h4>DESCRIÇÃO DA EMPRESA:</h4>
                    <h5 className="desc">XXXXXXXXXXXXXXX XXXXXXXXXXXX</h5>
                   
                </div>
                <div className="right">
                    <div>
                        <h3>Faturou até o momento:</h3>
                        <hr/>
                        <hr/>
                        <div>
                            <h2>1000,00 R$</h2>
                        </div>
                        <hr/>
                        <hr/>
                    </div>
                    <Link to='/Vender'>
                        <Button variant="primary">Vender</Button>{' '}
                    </Link>
                   
                   
                    <Link to='/Vender_LerQRCode'>
                        <Button variant="primary">Verificar saldo do cliente</Button>{' '}
                    </Link>
                   
                   
                    <Link to='/Extrato'>
                        <Button variant="primary">Extrato</Button>{' '}
                    </Link>
                   
                   
                    <Link to='/EnviarComprovante'>
                        <Button variant="primary">Enviar comprovante de compra</Button>{' '}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HomeEmp