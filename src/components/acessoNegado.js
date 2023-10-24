import EmptyNavBar from "./EmptyNavBar";
import React from "react";


function Negado () {
    return (
        <div>
            <EmptyNavBar />
            <div class='box acesso'>
                <h1>&#9785;</h1>
                <p>Acesso negado, infelizmente você não pode acessar esta página.</p>
                <p>Tente atualizar a página se acha que isso é um erro.</p>
            </div>
        </div>
    )
}

export default Negado;