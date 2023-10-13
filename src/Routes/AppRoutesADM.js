import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeADM from "../pages/ADM/HomeADM";
import ListMembro from "../pages/ADM/ListMembro";
import AddMembro from "../pages/ADM/AddMembro";
import HomeCom from "../pages/COM/HomeCom";
import MonEmp from "../pages/COM/MonEmp";
import AddEmp from "../pages/COM/AddEmp";
import AddCred from "../pages/COM/AddCred";
import CadProd from "../pages/COM/CadProd";
import LerQrCode from "../pages/COM/LerQR";
import CadQrCode from "../pages/COM/CadQrCode";

const AppRoutesADM = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeADM />} />
            <Route path="/ListaMembros" element={<ListMembro />} />
            <Route path="/AdicionarMembros" element={<AddMembro />} />
            <Route path="/ComissaoDashboard" element={<HomeCom />} />
            <Route path="/AdicionarCredito" element={<AddCred />} />
            <Route path="/AdicionarEmpresa" element={<AddEmp />} />
            <Route path="/CadastrarProdutos" element={<CadProd />} />
            <Route path="/LerQRCode" element={<LerQrCode />} />
            <Route path="/CadastrarQrCode" element={<CadQrCode />} />
            <Route path="/MonitorarEmpresas" element={<MonEmp />} />
        </Routes>
    );
};

export default AppRoutesADM;
