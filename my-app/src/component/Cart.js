import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartItem from "./CartItem";
import axios from "axios";
import './style.css';


function CategoryPage() {
    const { customer_id } = useParams();
    const [data, setData] = useState(null);
    const [totalPrices, setTotalPrices] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState(0);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [customerData, setCustomerData] = useState([])
    const [radio, setRadio] = useState("");
    const [showRadioPopup, setShowRadioPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getcart/${customer_id}`);
                const cartData = response.data.cartItems;
                let totalPrice = response.data.totalPrice;

                if (totalPrice == null) {
                    totalPrice = 0;
                }

                if (totalPrice > 1000) {
                    if (radio === 'รับที่ร้าน') {
                        const discount = totalPrice * 0.1;
                        totalPrice -= discount;
                        setDiscount(10);
                    } else if (radio === 'จัดส่ง') {
                        const discount = totalPrice * 0.05;
                        totalPrice -= discount;
                        setDiscount(5);
                    }
                }

                setData(cartData);
                setTotalPrices(totalPrice);

                axios.get('http://localhost:8081/auth/protected-route')
                    .then(result => {
                        return axios.get(`http://localhost:8081/getcustomerfromemail/${result.data.email}`);
                    })
                    .then(customerResponse => {
                        const customerData = customerResponse.data;
                        setCustomerData(customerData);
                    })
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchData();
    }, [customer_id, radio]);

    const getStock = async (product_id) => {
        const response = await axios.get(`http://localhost:8081/getproductbyid/${product_id}`);
        const product = response.data;
        const stock = product.stock;
        setStock(stock);
        return (stock);
    }

    const handleConfirm = () => {
        if (data && data.length > 0 && radio) {
            setShowConfirmPopup(true);
        } else if (!radio) {
            setShowRadioPopup(true);
        } else {
            setShowPopup(true);
        }
    };

    const handleConfirmOk = () => {
        setShowPopup(false);
        setShowRadioPopup(false)
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
                await Promise.all(data.map(async (item) => {
                    const stock = await getStock(item.product_id);
                    const updatedStock = stock - item.quantity;

                    await axios.post(`http://localhost:8081/stock_update/${item.product_id}`, {
                        stock: updatedStock
                    });
                }));

                await axios.delete(`http://localhost:8081/deletecart/${customer_id}`);
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

    const handleRadioChange = (event) => {
        setRadio(event.target.value);
        updateTotalAndDiscount(data, event.target.value);
    };

    const updateTotalAndDiscount = (cartData, selectedOption) => {
        let totalPrice = 0;

        cartData.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        let newDiscount = 0;

        if (totalPrice > 1000) {
            if (selectedOption === 'รับที่ร้าน') {
                newDiscount = totalPrice * 0.1;
            } else if (selectedOption === 'จัดส่ง') {
                newDiscount = totalPrice * 0.05;
            }
        }

        setDiscount(newDiscount);
        setTotalPrices(totalPrice - newDiscount);
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
                <div>
                    <h1>Cart</h1>
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
                </div>
                <hr />
                <div style={cardContainerStyle}>
                    {data.map((item, index) => (
                        <div key={index} style={cardStyle}>
                            <CartItem item={item} />
                        </div>
                    ))}
                </div>
                <div className="total-price-container">
                    <p style={{ marginRight: '10px' }}>Total Discount: {discount} %</p>
                    <h2 style={{ marginRight: '10px' }}>Total Price: {totalPrices}</h2>
                    <div style={{ display: 'flex', marginRight: '20px' }}>
                        <div style={{ display: 'inline-block' }}>
                            <input
                                type="radio"
                                id="pickupRadio"
                                name="deliveryOption"
                                value="รับที่ร้าน"
                                style={{ width: '20px', height: '20px' }}
                                checked={radio === "รับที่ร้าน"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="pickupRadio" style={{ marginLeft: '5px', fontSize: '20px' }}>รับที่ร้าน</label>
                        </div>

                        <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                            <input
                                type="radio"
                                id="deliveryRadio"
                                name="deliveryOption"
                                value="จัดส่ง"
                                style={{ width: '20px', height: '20px' }}
                                checked={radio === "จัดส่ง"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="deliveryRadio" style={{ marginLeft: '5px', fontSize: '20px' }}>จัดส่ง</label>
                        </div>
                    </div>
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
            {showRadioPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>เลือกวิธีรับสินค้า</p>
                        <button className='btn btn-success m-3' onClick={handleConfirmOk}>Yes</button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default CategoryPage;
