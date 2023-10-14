import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Login />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
