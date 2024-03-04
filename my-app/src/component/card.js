import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "./product";
import "./style.css";
import axios from "axios";

function Card({ item }) {
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await Product.getAllProducts();
        setData(productsData);
        if (productsData.stock === 0) {
          setData({
            stock: "Out of Stock"
          });
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
    handleCustomer();
  }, []);

  const handleCustomer = () => {
    axios.get('http://localhost:8081/auth/protected-route')
      .then(result => {
        axios.get(`http://localhost:8081/getcustomerfromemail/${result.data.email}`)
          .then(res => {
            setCustomerData(res.data.customer_id);
          })
          .catch(error => {
            console.error('Error fetching customer data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleClick = () => {
    navigate(`/l/page/${customerData}/${item.product_id}`);
  }


  return (
    <div className="card inline mx-4 cardStyle p-2" onClick={ handleClick }>
        <img
          src={`http://localhost:8081/images/${item.image}`}
          alt=""
          className="product_img_card"
        />
        <div className="card-body" style={{ flex: '1' }}>
          <h4 className="card-title">{item.name}</h4>
          <p className="card-text badge bg-secondary">{item.category_name}</p>
          <p style={{ fontSize: '20px' }}>Stock: {item.stock > 0 ? item.stock : <span className="badge bg-danger">Out of Stock</span>}</p>
        </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
        <div className="mx-2">
          <h2>฿ {item.price}</h2>
        </div>
        <div style={{ alignSelf: 'flex-end' }}>
          <button className="btn btn-outline-dark mx-2 my-2" >
            Click for more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;