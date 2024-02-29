import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookPage() {
    const { product_id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalSelect, setTotalSelect] = useState(1);
    const [updateStock, setUpdateStock] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkData, setCheckData] = useState({
        quantity: 0,
        total_price: 0,
        product_id: 0,
    });
    const [values, setValues] = useState({
        name: "",
        price: "",
        quantity: totalSelect,
        total_price: totalPrice,
        image: "",
        product_id: "",
    });

    const handlebuy = async () => {
        try {
            const totalPrice = totalSelect * data.price;

            if (data.stock === 0) {
                handlePopup();
                return; 
            }
    
            if (data.product_id === checkData.product_id) {
                const updatedCheckData = {
                    quantity: checkData.quantity + totalSelect,
                    total_price: checkData.total_price + totalPrice,
                };
    
                setCheckData(updatedCheckData);
    
                await axios.put(`http://localhost:8081/updatecart/${product_id}`, updatedCheckData);
            } else {
                const cartItem = {
                    name: data.name,
                    price: data.price,
                    quantity: totalSelect,
                    total_price: totalPrice,
                    image: data.image,
                    product_id: data.product_id,
                };
    
                await axios.post('http://localhost:8081/addcart', cartItem);
            }
    
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("Validation error:", error.response.data.error);
            } else {
                console.error("Server error:", error.message);
            }
        }
    };
    const handleSelectUp = () => {
        if (data && totalSelect < data.stock) {
            setTotalSelect(totalSelect => totalSelect + 1);
            setUpdateStock(updateStock => updateStock - 1);
        }
    }

    const handleSelectDown = () => {
        if (data && totalSelect > 1) {
            setTotalSelect(totalSelect => totalSelect - 1);
            setUpdateStock(updateStock => updateStock + 1);
        }
    }

    const [showPopup, setShowPopup] = useState(false);

    axios.defaults.withCredentials = true

    const handlePopup = () => {
        setShowPopup(true);
    };

    const handleConfirmPopup = () => {
        setShowPopup(false);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getproductbyid/${product_id}`);
                const productData = response.data;

                try {
                    const response2 = await axios.get(`http://localhost:8081/getcartitembyproductid/${product_id}`);
                    const cartData = response2.data;
                    setCheckData({
                        quantity: cartData.quantity,
                        total_price: cartData.total_price,
                        product_id: cartData.product_id,});
                    console.log(checkData);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                    setCheckData({
                        quantity: 0,
                        total_price: 0,
                        product_id: 0,
                    });
                    console.log(checkData);
                }

                if (productData) {
                    setData(productData);
                    setUpdateStock(productData.stock);
                    setTotalPrice(productData.price);

                    setValues({
                        name: productData.name,
                        price: productData.price,
                        quantity: totalSelect,
                        total_price: totalPrice,
                        image: productData.image,
                        product_id: productData.product_id,
                    });
                } else {
                    console.error(`Product with ID ${product_id} not found.`);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [product_id, totalSelect, totalPrice]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container">
            <img
          src={`http://localhost:8081/images/${data.image}`}
          alt=""
          className="product_img"
        />
            <h2>{data.name}</h2>
            <p>{data.category_name}</p>
            <p>Price: {data.price}</p>
            <p>Stock: {data.stock}</p>
            <div className="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5vh' }}>
                <i className="bi bi-chevron-down btn" onClick={handleSelectDown}></i>
                <h5>{totalSelect}</h5>
                <i className="bi bi-chevron-up btn" onClick={handleSelectUp}></i>
            </div>
            <button className="btn btn-success" onClick={handlebuy}>Add to Cart</button>
            <div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>OUT OF STOCK!</p>
                        <button className='btn btn-success m-3' onClick={handleConfirmPopup}>OK</button>
                    </div>
                </div>
            )}
            </div>
        </div>
        
    );
}

export default BookPage;
