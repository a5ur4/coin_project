import React, { useEffect, useState } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/general.css";
import "../../styles/styleCOM.css";
import axios from "axios";

const RemProd = () => {
    const [empresas, setEmpresas] = useState([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState("");
    const [nomeEmpresa, setEmpresaSelecionada] = useState("");
    const [checkboxMarcado, setCheckboxMarcado] = useState(false);


    const removerProduto = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/php/COM/removerProduto.php",
                {
                    nomeEmpresa: nomeEmpresa,
                    nomeProduto: nomeProduto,
                    valorProduto: valorProduto
                },
                {
                    headers: {
                        "Content-Type": "applicationjson/",
                    },
                }
            );

            alert(response.data.mensagem)
            setEmpresaSelecionada('');
            setValorProduto('');
            setNomeProduto('');
        } catch (error) {
            console.error("Erro na requisição:", error.response.data);
        }
    };

    useEffect(() => {
        axios
            .get(
                "http://localhost:8080/php/COM/cadastrarProduto.php?funcao=listarEmpresas"
            )

            .then((response) => {
                setEmpresas(response.data);
            })
            .catch((error) => {
                alert("Erro interno no servidor, por favor, atualize a página.")
            });
    }, []);

    return (
        <>
            <NavBarCOM />
            <div className="box">
                <h3 className="text">Remover Produto</h3>
                <Form onSubmit={removerProduto}>
                    <div className="contain-inputs">
                        <Form.Group controlId="formBasicNumber">
                            <Form.Label className="default-text">Nome da empresa:</Form.Label>
                            <Form.Select
                                aria-label="Selecione a empresa."
                                className="input"
                                value={nomeEmpresa}
                                onChange={(e) => {
                                    setEmpresaSelecionada(e.target.value)
                                }}
                            >
                                <option>Selecione a empresa.</option>
                                {empresas.map((empresa) => (
                                    <option key={empresa.id} value={empresa.name}>
                                        {empresa.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formBasicNumber">
                            <Form.Label className="default-text">
                                Nome do produto:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="input"
                                placeholder="Digite o nome do produto."
                                value={nomeProduto}
                                onChange={(e) => setNomeProduto(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicNumber">
                            <Form.Label className="default-text">
                                Valor do produto:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                className="input"
                                max={9999.99}
                                step="0.01"
                                placeholder="Digite o valor do produto."

                                value={valorProduto}
                                onChange={(e) => setValorProduto(e.target.value)}
                            />
                        </Form.Group>

                    </div>

                    <Form.Check
                        type="checkbox"
                        label="Estou ciente que essa ação é irreversível e que removerá o produto escolhido da empresa."
                        checked={checkboxMarcado}
                        onChange={(e) => setCheckboxMarcado(e.target.checked)}
                    />
                    <div className="btn-space">
                        <Button variant="warning" type="submit" disabled={!checkboxMarcado}>
                            Concluir
                        </Button>
                    </div>

                </Form>
            </div>
        </>
    );
};

export default RemProd;
