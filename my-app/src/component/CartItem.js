import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function CartItem({ item }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/getcart");
                const cartData = response.data;
                setData(cartData);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleDelete = (item_id) => {
         axios.delete(`http://localhost:8081/deletecartitem/${item_id}`)
         .then(res => {
            window.location.reload();
          })
          .catch(err => console.log(err));
    }


    const cardStyle = {
        width: '75%',
        height: '80px',
        margin: '0 1%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div className="card inline mx-4 shadow" style={cardStyle}>
            <div style={{ flex: '8%', marginLeft: '20px' }}>
                <img
                    src={`http://localhost:8081/images/${item.image}`}
                    alt=""
                    className="cartimg"
                />
            </div>
            <div className="card-body" style={{ flex: '92%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ flex: '23%', marginRight: '8px' }}>
                    <h5>{item.name}</h5>
                </div>
                <div style={{ flex: '23%', marginRight: '8px' }}>
                    <h5>{item.price}</h5>
                </div>
                <div style={{ flex: '23%', marginRight: '8px' }}>
                    <h5>{item.quantity}</h5>
                </div>
                <div style={{ flex: '23%' }}>
                    <h5>{item.total_price}</h5>
                </div>
                <div>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.item_id)}>X</button>
                </div>
            </div>
        </div>

    );
}

export default CartItem;
