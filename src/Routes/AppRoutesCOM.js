import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeCom from "../pages/COM/HomeCom";
import MonEmp from "../pages/COM/MonEmp";
import AddEmp from "../pages/COM/AddEmp";
import AddCred from "../pages/COM/AddCred";
import CadProd from "../pages/COM/CadProd";
import LerQrCode from "../pages/COM/LerQR";
import CadQrCode from "../pages/COM/CadQrCode";

const AppRoutesCOM = () => {
    return (
        
        <Routes>
            <Route path="/*" element={<HomeCom />} />
            <Route path="/AdicionarCredito" element={<AddCred />} />
            <Route path="/AdicionarEmpresa" element={<AddEmp />} />
            <Route path="/CadastrarProdutos" element={<CadProd />} />
            <Route path="/LerQRCode" element={<LerQrCode />} />
            <Route path="/MonitorarEmpresas" element={<MonEmp />} />
            <Route path="/CadastrarQrCode" element={<CadQrCode />} />
        </Routes>
    );
};

export default AppRoutesCOM;
