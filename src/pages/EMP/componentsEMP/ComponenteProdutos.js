import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from 'axios';

function ProductComponent() {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const cookieToken = Cookies.get("token");

  useEffect(() => {

    const solicitarProdutos = async () => {
      if (cookieToken) {
        const cookie = jwt_decode(cookieToken);
        const nomeEmpresa = cookie['empresa'];

        const response = await axios.post('http://localhost:8080/php/EMP/listarProdutos.php', {
          nomeEmpresa: nomeEmpresa
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProducts(response.data.produtos);
      }
    }

    solicitarProdutos();
  }, []);

  return (
    <div className="contain-products-enviar-comprovante">
      {products.map((product, index) => (
        <div className="info-products-enviar-comprovante" key={index}>
          <h6 className="product-name">{product.name}</h6>
          <h6 className="product-value">{`R$ ${product.value}`}</h6>
        </div>
      ))}
    </div>
  );
}

export default ProductComponent;
