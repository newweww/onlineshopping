import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./product";
import Card from "./card";
import CartItem from "./CartItem";
import axios from "axios";
import './style.css';


function CategoryPage() {
    const [data, setData] = useState(null);
    const [totalPrices, setTotalPrices] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/getcart");
                const cartData = response.data.cartItems;
                const totalPrice = response.data.totalPrice;
                setData(cartData);
                setTotalPrices(totalPrice);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchData();
    }, []);

    const handleConfirmBuy = () => {
        
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const cardContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: "20px",
    };

    const cardStyle = {
        width: '75%',
        flex: "0 0 calc(100% - 20px)",
        marginBottom: "20px",
        boxSizing: "border-box",
    };

    return (
        <div style={{ paddingBottom: '50px' }} >
            <div className='mx-5' style={{ textAlign: 'left' }}>
                <h3>Cart</h3>
                <div className="card inline mx-4 shadow" style={cardStyle}>
                    <div className="card-body" style={{ flex: '92%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ flex: '8%', marginLeft: '10px' }}>
                            <h6>Image</h6>
                        </div>
                        <div style={{ flex: '15%', marginLeft: '10px' }}>
                            <h6>Name</h6>
                        </div>
                        <div style={{ flex: '20%' }}>
                            <h6>Price</h6>
                        </div>
                        <div style={{ flex: '20%' }}>
                            <h6>Quantity</h6>
                        </div>
                        <div style={{ flex: '20%', marginRight: '50px'}}>
                            <h6>Total</h6>
                        </div>
                    </div>
                </div>
                <hr />
                <div />
                <div style={cardContainerStyle}>
                    {data.map((item, index) => (
                        <div key={index} style={cardStyle}>
                            <CartItem item={item} />
                        </div>
                    ))}
                </div>
                <div className="total-price-container">
                    <h2 style={{ marginRight: '10px' }}>Total Price: {totalPrices}</h2>
                    <button className="btn btn-success" style={{ fontSize: '20px', width: '300px'}} onClick={handleConfirmBuy}>Confirm</button>
                </div>

            </div>
        </div>
    );

}

export default CategoryPage;
