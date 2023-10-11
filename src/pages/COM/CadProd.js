import React, { useEffect, useState } from 'react';
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const CadProd = () => {

    const [empresas, setEmpresas] = useState([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState("");
    const [nomeEmpresa, setEmpresaSelecionada] = useState("");

    const cadastrarProduto = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/php/COM/cadastrarProduto.php", {
                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                nomeEmpresa: nomeEmpresa,
                funcao: 'cadastrarProdutoPOST'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
        console.log("TRY ou CATCH realizado.");
    };

    useEffect(() => {
        axios.get('http://localhost:8080/php/COM/cadastrarProduto.php?funcao=listarEmpresas')
        
            .then(response => {
                console.log('Resposta do servidor:', response.data);
                setEmpresas(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar empresas:', error);
            });

    }, []);

    return (
        <>
            <NavBarCOM />
            <div className="box">
                <h2 classname='text'>Cadastrar Produto</h2>
                <Form onSubmit={cadastrarProduto}>
                    <Form.Group controlId="formBasicText">
                        <Form.Label className='default-text'>Nome do produto:</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={30}
                            placeholder="Digite o nome do produto."
                            value={nomeProduto}
                            onChange={(e) => setNomeProduto(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicNumber">
                        <Form.Label className='default-text'>Valor do produto:</Form.Label>
                        <Form.Control
                            type="number"
                            max={9999.99}
                            step="0.01"
                            placeholder="Digite o valor do produto."
                            value={valorProduto}
                            onChange={(e) => setValorProduto(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Label className='default-text'>Nome da empresa:</Form.Label>
                    <Form.Select
                        aria-label="Selecione a empresa."
                        value={nomeEmpresa}
                        onChange={(e) => setEmpresaSelecionada(e.target.value)}
                    >
                        <option>Selecione a empresa.</option>
                        {empresas.map(empresa => (
                            <option key={empresa.id} value={empresa.name}>
                                {empresa.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Button variant="warning" type="submit">
                        Concluir
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default CadProd