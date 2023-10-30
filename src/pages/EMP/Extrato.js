import React, { useEffect, useState } from "react";
import NavBarEMP from "./componentsEMP/NavBarEMP";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function Extrato() {
  const [arrows, setArrows] = useState([]);

  useEffect(() => {
    const cookieToken = Cookies.get("token");

    const realizarExtrato = async () => {
      if (cookieToken) {
        const token = jwt_decode(cookieToken);
        if (token) {
          try {
            const response = await axios.post(
              "http://localhost:8080/php/EMP/extrato.php",
              {
                nomeEmpresa: token["empresa"],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log(response.data);
            const extratoData = response.data.extrato;
            if (Array.isArray(extratoData)) {
              const formatadoExtrato = extratoData.map((extrato, index) => {
                return {
                  id: extrato.id,
                  tipo: extrato.type,
                  valor: extrato.value,
                  data_hora: extrato.date_hour,
                  responsavel: extrato.responsible,
                  index: index, // Adicionamos o índice ao objeto
                };
              });
              setArrows(formatadoExtrato);
            } else {
              console.warn(
                "A resposta do servidor não contém um campo 'extrato' válido."
              );
            }
          } catch (error) {
            console.warn(error);
          }
        }
      }
    };

    realizarExtrato();
  }, []);

  return (
    <div>
      <NavBarEMP />
      <div className="container-extrato-empresa">
        {arrows.map((arrowData) => (
          <div key={arrowData.id} className={arrowData.index % 2 === 0 ? "even" : "odd"}>
            <div className="info darker-background">
              <div className="arrow-container">
                <div
                  className={`${
                    arrowData.tipo === "entrada" ? "green-arrow" : "red-arrow"
                  }`}
                >
                  <div className="line"></div>
                </div>
              </div>
              <div class="extrato-info">
                <h6>ID da compra: {arrowData.id}</h6>
                <h6>Tipo: {arrowData.tipo}</h6>
                <h6>Valor: {arrowData.valor}</h6>
                <h6>Data e Hora: {arrowData.data_hora}</h6>
                <h6>Responsável: {arrowData.responsavel}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Extrato;
