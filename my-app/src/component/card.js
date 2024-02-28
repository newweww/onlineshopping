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
        if (productsData.stock == 0) {
          setData({
            stock: "Out of Stock"
          })
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card inline mx-4 cardStyle" >
      <img
        src={`http://localhost:8081/images/${item.image}`}
        alt=""
        className="product_img"
      />
      <div className="card-body" style={{ flex: '1' }}>
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text badge bg-secondary">{item.category_name}</p>
        <p>Stock: {item.stock > 0 ? item.stock : <p className="badge bg-danger">Out of Stock</p>}</p>
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
