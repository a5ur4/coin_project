import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import AppRoutes from "./Routes/AppRoutes";
import HomeADM from "./pages/ADM/HomeADM";
import HomeCom from "./pages/COM/HomeCom";
import HomeEmp from "./pages/EMP/HomeEmp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route
          path="/app/*"
          element={isAuthenticated ? <AppRoutes /> : <Navigate to="/" />}
        />
        <Route path="/administrador/*" element={<HomeADM />} />
        <Route path="/comissao/*" element={<HomeCom />} />
        <Route path="/trabalhador/*" element={<HomeEmp />} />
      </Routes>
    </Router>
  );
}

export default App;
