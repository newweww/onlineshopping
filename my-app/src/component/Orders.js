import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Orders = ({ item, index }) => {
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
        width: '100%',
        height: '80px',
        margin: '0 1%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div className="card inline mx-4 shadow" style={cardStyle}>
            <div style={{ flex: '16%', marginLeft: '12px' }}>
                    <h5>{index + 1}</h5>
                </div>
            <div className="card-body" style={{ flex: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ flex: '16%' }}>
                    <h5>{item.name}</h5>
                </div>
                <div style={{ flex: '20%' }}>
                    <h5>{item.phone}</h5>
                </div>
                <div style={{ flex: '20%', marginRight: '60px' }}>
                    <h5>{item.email}</h5>
                </div>
                <div style={{ flex: '15%' }}>
                    <h5>{item.total_price}</h5>
                </div>
                <div style={{ flex: '20%' }}>
                    <h5>{item.dates}</h5>
                </div>

            </div>
        </div>

    );
}

export default Orders