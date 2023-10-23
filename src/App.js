import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import AppRoutesADM from "./Routes/AppRoutesADM";
import AppRoutesEMP from "./Routes/AppRoutesEMP";
import AppRoutesCOM from "./Routes/AppRoutesCOM";
import MonEmp from "./pages/COM/MonEmp";
import AddEmp from "./pages/COM/AddEmp";
import AddCred from "./pages/COM/AddCred";
import CadProd from "./pages/COM/CadProd";
import LerQrCode from "./pages/COM/LerQR";
import CadQrCode from "./pages/COM/CadQrCode";
import ListMembro from "./pages/ADM/ListMembro";
import AddMembro from "./pages/ADM/AddMembro";
import EnvComp from "./pages/EMP/EnvComp";
import Extrato from "./pages/EMP/Extrato";
import Vender from "./pages/EMP/Vender";
import VerificarSaldo from "./pages/EMP/VerificarSaldo";
import LerQrVenda from "./pages/EMP/LerQrVenda";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Negado from "./pages/acessoNegado";
import Termos from "./pages/Termos"

function App() {
  const navigate = useNavigate();
  const cookieToken = Cookies.get("token");
  const logado = cookieToken !== undefined;

  if (logado) {
    const token = jwt_decode(cookieToken);
    const cargo = token["cargo"];

    if (cargo === "admin") {
      return (
        <div>
          <Routes>
            <Route path="*" element={<AppRoutesADM />} />
            <Route path="/AdministradorDashboard/*" element={<AppRoutesADM />} />
            <Route path="/ComissaoDashboard/*" element={<AppRoutesCOM />} />
            <Route path="/AdicionarCredito" element={<AddCred />} />
            <Route path="/AdicionarEmpresa" element={<AddEmp />} />
            <Route path="/CadastrarProdutos" element={<CadProd />} />
            <Route path="/LerQRCode" element={<LerQrCode />} />
            <Route path="/MonitorarEmpresas" element={<MonEmp />} />
            <Route path="/CadastrarQrCode" element={<CadQrCode />} />
            <Route path="/ListaMembros" element={<ListMembro />} />
            <Route path="/AdicionarMembros" element={<AddMembro />} />
          </Routes>
        </div>
      );
    } else if (cargo === "commission") {
      return (
        <div>
          <Routes>
            <Route path="*" element={<AppRoutesCOM />} />
            <Route path="/ComissaoDashboard/*" element={<AppRoutesCOM />} />
            <Route path="/AdicionarCredito" element={<AddCred />} />
            <Route path="/AdicionarEmpresa" element={<AddEmp />} />
            <Route path="/CadastrarProdutos" element={<CadProd />} />
            <Route path="/LerQRCode" element={<LerQrCode />} />
            <Route path="/MonitorarEmpresas" element={<MonEmp />} />
            <Route path="/CadastrarQrCode" element={<CadQrCode />} />

            {/* Rotas Inacessíveis */}

            <Route path="/AdministradorDashboard/*" element={<Negado />} />
            <Route path="/ListaMembros" element={<Negado />} />
            <Route path="/AdicionarMembros" element={<Negado />} />
            <Route path="/EmpresaDashboard" element={<Negado />} />
            <Route path="/Extrato" element={<Negado />} />
            <Route path="/EnviarComprovante" element={<Negado />} />
            <Route path="/Vender" element={<Negado />} />
            <Route path="/VerificarSaldo" element={<Negado />} />
            <Route path="/LerQrVenda" element={<Negado />} />
          </Routes>
        </div>
      );
    } else if (cargo === "worker") {
      return (
        <Routes>
          <Route path="*" element={<AppRoutesEMP />} />
          <Route path="/EmpresaDashboard/*" element={<AppRoutesEMP />} />
          <Route path="/Extrato" element={<Extrato />} />
          <Route path="/EnviarComprovante" element={<EnvComp />} />
          <Route path="/Vender" element={<Vender />} />
          <Route path="/VerificarSaldo" element={<VerificarSaldo />} />
          <Route path="/LerQrVenda" element={<LerQrVenda />} />
          <Route path="/Negado" element={<Negado/>} />
        </Routes>
      );
    } else {
      return (
        <div>
          <Routes>
            <Route path="/Negado" element={<Negado />} />
          </Routes>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Routes>
          <Route path="*" element={<Login navigate={navigate} />} />
          <Route path="/login" element={<Login navigate={navigate} />} />
          <Route path="/termos" element={<Termos/>} />
        </Routes>
      </div>
    );
  }
}

export default App;
