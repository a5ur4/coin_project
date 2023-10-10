import React, { useState, useEffect } from "react";
import NavBarCOM from "./componentsCOM/NavBarCOM";
import EmpCard from "./componentsCOM/EmpCard";
import axios from 'axios';

const MonEmp = () => {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/php/COM/monitorarEmpresas.php")
            .then(response => {
                setEmpresas(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar empresas:", error);
            });
    }, []);

    return (
        <>
            <NavBarCOM />
            <br />
            <br />
            <div className='ComBox'>
                <h2>Monitorar Empresas</h2>
                <hr />
                <hr />
                <br />
                <div className='cardsAlign'>
                    {Array.isArray(empresas) && empresas.length > 0 ? (
                        empresas.map(empresa => (
                            <EmpCard
                                key={empresa.id}
                                nome={empresa.name}
                                saldo={empresa.balance}
                                descricao={empresa.description}
                            />
                        ))
                    ) : (
                        <p>Nenhuma empresa encontrada.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default MonEmp;
