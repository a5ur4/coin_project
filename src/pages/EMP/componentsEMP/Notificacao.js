import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notificacao({ message }) {
  useEffect(() => {
    if (message) {
      toast.success(message, { autoClose: 4000 });
    }
  }, [message]);

  return <ToastContainer position="top-right" />;
}

export default Notificacao;
