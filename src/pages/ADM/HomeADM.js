import React from "react";
import EmptyNavBar from "../../components/EmptyNavBar";
import { Link } from "react-router-dom";
const HomeADM = () => {
    return(
        <>
            <EmptyNavBar />
            <h1 class="text">Administrador</h1>
            <Link to='/ListaMembros'>
                <h2 class="button"><button>Lista de Membro</button></h2>
            </Link>
            <Link to='/ComissaoDashboard'>
                <h2 class="button1"><button>Página da comissão</button></h2>
            </Link>
        </>
    )
}

export default HomeADM;