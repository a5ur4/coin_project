import EmptyNavBar from "../components/EmptyNavBar";
import React from "react";


function Negado () {
    return (
        <div>
            <EmptyNavBar />
            <div class='box acesso'>
                <h1>&#9785;</h1>
                <p>Acesso negado, infelizmente você não pode acessar esta página.</p>
            </div>
        </div>
    )
}

export default Negado;