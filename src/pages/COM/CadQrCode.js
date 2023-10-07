import React, { useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from 'react-bootstrap/Button';
import './../COM/StyleCOM.css';
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
                <div className='boxCred'>
                    <h2 className='text'>Cadastrar Cliente</h2>
                    <br></br>
                    <label>Nome:</label>
                    <br></br>
                    <input 
                        placeholder="Digite o nome do cliente" 
                        className='input'
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}    
                    >
                    </input>

                    <br></br>
                    <br></br>
                    <label>Data de nascimento:</label>
                    <input 
                        placeholder="Digite a data de nascimento do cliente" 
                        className='input'
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    >     
                    </input>
                    <br></br>
                    <br></br>
                    <Button variant="primary" type="submit" className="btn">Ou Leia o QR Code para salvar o cliente.</Button>
                    <br></br>
                    <br></br>
                        <div className="caixa">
                        </div>
                    <br></br>
                    <Button variant="primary" type="submit" className="btn" onSubmit={enviarDados}>
                        Concluir
                    </Button>
                </div>
            </div>
        </>
    )
}


export default CadQrCode