// Card.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./product";
import "./style.css"

function Card({ item }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await Product.getAllProducts();
        console.log(productsData);
        setData(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const cardStyle = {
    width: '100%',
    margin: '0 1%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="card inline mx-4 shadow" style={cardStyle}>
      <img
        src={`http://localhost:8081/images/${item.image}`}
        alt=""
        className=""
      />
      <div className="card-body" style={{ flex: '1' }}>
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.category_name}</p>
        <p>Stock: {item.stock}</p>
        <p>Price: {item.price}</p>
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        <Link to={`/l/page/${item.product_id}`} className="btn btn-primary mx-2 my-2">
          More
        </Link>
      </div>
    </div>
  );
}

export default Card;
