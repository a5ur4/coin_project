import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importe useNavigate
import Login from './Login';
import AppRoutesADM from './Routes/AppRoutesADM';
import AppRoutesEMP from './Routes/AppRoutesEMP';
import AppRoutesCOM from './Routes/AppRoutesCOM';

function App() {
  const navigate = useNavigate(); // Use useNavigate para redirecionar

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            // Use navigate para redirecionar para a tela de login
            <Login navigate={navigate} />
          }
        />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/administradorDashboard/*" element={<AppRoutesADM />} />
        <Route path="/empresaDashboard/*" element={<AppRoutesEMP />} />
        <Route path="/comissaoDashboard/*" element={<AppRoutesCOM />} />
        {/* Defina outras rotas aqui */}
      </Routes>
    </div>
  );
}

export default App;
