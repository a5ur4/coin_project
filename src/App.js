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
<<<<<<< HEAD
        <AppRoutesEMP />
        {/* <AppRoutesCOM /> */}
        {/* <Footer /> */}
=======
        {/* <AppRoutesEMP /> */}
        <AppRoutesCOM />
        <Footer />

>>>>>>> 3f25bc34a5289d1ceec5f62af70f4531e4da4702
      </div>
    </BrowserRouter>
  );
}

export default App;
