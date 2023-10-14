
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeADM from "../pages/ADM/HomeADM";
import HomeCom from "../pages/COM/HomeCom";
import HomeEmp from "../pages/EMP/HomeEmp";
import Login from "../Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/administrador" element={<HomeADM />} />
      <Route path="/comissao" element={<HomeCom />} />
      <Route path="/trabalhador" element={<HomeEmp />} />
    </Routes>
  );
};

export default AppRoutes;
