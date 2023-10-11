import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import AppRoutesEMP from './Routes/AppRoutesEMP'
import AppRoutesCOM from './Routes/AppRoutesCOM'
import AppRoutesADM from './Routes/AppRoutesADM';
import Login from './pages/EMP/Login';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Login /> */}
        {/* <AppRoutesADM /> */}
        <AppRoutesEMP />
        {/* <AppRoutesCOM /> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
