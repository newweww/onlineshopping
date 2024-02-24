// Card.js
import React from "react";
import { Link } from "react-router-dom";

function Card({ item }) {
    
  const cardStyle = {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="card inline mx-4" style={cardStyle}>
      <img
        className="card-img-top card_img"
        src="/assets/img1.jpg" 
        alt=""
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
