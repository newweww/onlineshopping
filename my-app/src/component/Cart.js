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
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [customerData, setCustomerData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/getcart");
                const cartData = response.data.cartItems;
                const totalPrice = response.data.totalPrice;
                setData(cartData);
                setTotalPrices(totalPrice);

                axios.get('http://localhost:8081/auth/protected-route')
                    .then(result => {
                        return axios.get(`http://localhost:8081/getcustomerfromemail/${result.data.email}`);
                    })
                    .then(customerResponse => {
                        const customerData = customerResponse.data;
                        setCustomerData(customerData);
                        console.log(customerData)
                    })
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchData();
    }, []);
    const handleConfirm = () => {
        if (data && data.length > 0) {
            setShowConfirmPopup(true);
        } else {
            setShowPopup(true);
        }
    };

    const handleConfirmOk = () => {
        setShowPopup(false);
    }

    const handleConfirmBuy = async () => {
        try {
            const currentDate = new Date().toISOString().split('T')[0];
            const response = await axios.post('http://localhost:8081/confirmbuy', {
                customer_id: customerData.customer_id,
                total_price: totalPrices,
                dates: currentDate,
            });
            if (response.data.success) {
                axios.delete('http://localhost:8081/deletecart')
                window.location.reload();
            }
            setShowConfirmPopup(false);
        } catch (error) {
            console.error('Error confirming purchase:', error);
        }
    };

    const handleClosePopup = () => {
        setShowConfirmPopup(false);
    };

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
                        <div style={{ flex: '20%', marginRight: '50px' }}>
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
                    <button className="btn btn-success" style={{ fontSize: '20px', width: '300px' }} onClick={handleConfirm}>Confirm</button>
                </div>

            </div>
            {showConfirmPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Are you sure</p>
                        <button className='btn btn-success m-3' onClick={handleConfirmBuy}>Yes</button>
                        <button className='btn btn-danger m-3' onClick={handleClosePopup}>No</button>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Please add product</p>
                        <button className='btn btn-success m-3' onClick={handleConfirmOk}>Yes</button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default CategoryPage;
