import React, { useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from 'react-bootstrap/Button';
import "../../styles/general.css";
import '../../styles/styleCOM.css';
import axios from 'axios';

const CadQrCode = () => {

    const [nomeCliente, setNomeCliente] = useState('');
    const [dataNascimento, setDataNascimento] = useState('')

    const enviarDados = async () =>
    {
        console.log(nomeCliente);

        try{
            const response = await axios.post('http://localhost:8080/php/COM/cadastrarQrCode.php', {
                nomeCliente: nomeCliente,
                dataNascimento: dataNascimento
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }catch (error) {
            console.log("Ops! Deu algum erro: ", error)
        }
    }
    
    return (
        <>
        <NavBarCOM/>
        <br></br>
            <div>
                <div className='box'>
                    <h2 className='text'>Cadastrar Cliente</h2>
                    <label>Nome:</label>
                    <input 
                        placeholder="Digite o nome do cliente" 
                        className='input'
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}    
                    >
                    </input>

                    <label>Data de nascimento:</label>
                    <input 
                        placeholder="Digite a data de nascimento do cliente" 
                        className='input'
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    >     
                    </input>
                    <h5>Ou Leia o QR Code para salvar o cliente.</h5>
                        <div className="box-qrcode">
                        </div>
                    <br></br>
                    <Button variant="warning" type="submit" onSubmit={enviarDados}>
                        Concluir
                    </Button>
                </div>
            </div>
        </>
    )
}


export default CadQrCode