import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./product";
import Card from "./card";
import CartItem from "./CartItem";
import axios from "axios";


function CategoryPage() {
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
                    <div style={{ flex: '23%', marginLeft: '30px'}}>
                        <h6>Name</h6>
                    </div>
                    <div style={{ flex: '23%' }}>
                        <h6>Price</h6>
                    </div>
                    <div style={{ flex: '23%' }}>
                        <h6>Quantity</h6>
                    </div>
                    <div style={{ flex: '23%', marginLeft: '30px'}}>
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
            </div>
        </div>
    );
    
}

export default CategoryPage;
