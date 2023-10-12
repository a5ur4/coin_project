import React from "react";
import { Routes, Route } from "react-router-dom";
import EnvComp from "../pages/EMP/EnvComp";
import Extrato from "../pages/EMP/Extrato";
import HomeEmp from "../pages/EMP/HomeEmp";
import Vender_Read_QRCODE from "../pages/EMP/Vender_Read_QRCODE";
import Vender from "../pages/EMP/Vender";

const AppRoutesEMP = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeEmp />} />
            <Route path="/Extrato" element={<Extrato />} />
            <Route path="/EnviarComprovante" element={<EnvComp />} />
            <Route path="/Vender" element={<Vender />} />
            <Route path="/Vender_LerQRCode" element={<Vender_Read_QRCODE />} />
        </Routes>
    );
};

export default AppRoutesEMP;
