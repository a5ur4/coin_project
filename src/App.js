import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import AppRoutesADM from './Routes/AppRoutesADM';
import AppRoutesEMP from './Routes/AppRoutesEMP';
import AppRoutesCOM from './Routes/AppRoutesCOM';
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
import LerQrVenda from "./pages/EMP/LerQrVenda"

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Login navigate={navigate} />
          }
        />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/AdministradorDashboard/*" element={<AppRoutesADM />} />
        <Route path="/EmpresaDashboard/*" element={<AppRoutesEMP />} />
        <Route path="/ComissaoDashboard/*" element={<AppRoutesCOM />} />
        <Route path="/AdicionarCredito" element={<AddCred />} />
        <Route path="/AdicionarEmpresa" element={<AddEmp />} />
        <Route path="/CadastrarProdutos" element={<CadProd />} />
        <Route path="/LerQRCode" element={<LerQrCode />} />
        <Route path="/MonitorarEmpresas" element={<MonEmp />} />
        <Route path="/CadastrarQrCode" element={<CadQrCode />} />
        <Route path="/ListaMembros" element={<ListMembro />} />
        <Route path="/AdicionarMembros" element={<AddMembro />} />
        <Route path="/Extrato" element={<Extrato />} />
        <Route path="/EnviarComprovante" element={<EnvComp />} />
        <Route path="/Vender" element={<Vender />} />
        <Route path="/VerificarSaldo" element={<VerificarSaldo />} />
        <Route path="/LerQrVenda" element={<LerQrVenda />} />
      </Routes>
    </div>
  );
}

export default App;
