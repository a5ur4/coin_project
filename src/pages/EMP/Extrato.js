import React from "react";
import NavBarEMP from "./componentsEMP/NavBarEMP";

const arrows = [
  { name: "João", id: "123", value: "R$ 200,00" },
  { name: "Maria", id: "456", value: "R$ 150,00" },
  { name: "Pedro", id: "789", value: "R$ 300,00" },
  { name: "Jhon", id: "078", value: "R$ 250,00" },
];

function Extrato() {
  return (
    <div>
      <NavBarEMP />
      <div className="container-extrato-empresa">
        {arrows.map((arrowData) => (
          <div key={arrowData.id}>
            <div className="arrow">
              <div className="line"></div>
            </div>
            <div className="info">
              <h6>Nome do cliente: {arrowData.name}</h6>
              <h6>ID do cliente: {arrowData.id}</h6>
              <h6>Valor da compra: {arrowData.value}</h6>
            </div>
          </div>
        ))}
      </div>  
    </div>
  );
}

export default Extrato;
