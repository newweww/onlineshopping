import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookPage() {
    const { product_id } = useParams();
    const { customer_id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalSelect, setTotalSelect] = useState(1);
    const [updateStock, setUpdateStock] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkData, setCheckData] = useState({
        quantity: 0,
        total_price: 0,
        product_id: 0,
        customer_id: 0
    });
    const [values, setValues] = useState({
        name: "",
        price: "",
        quantity: totalSelect,
        total_price: totalPrice,
        image: "",
        product_id: "",
        customer_id: ""
    });

    const handlebuy = async () => {
        try {
            checkDatafc();
            const totalPrice = totalSelect * data.price;
    
            if (data.stock === 0) {
                handlePopup();
                return;
            }
    
            const updatedCheckData = {
                quantity: checkData.quantity + totalSelect,
                total_price: checkData.total_price + totalPrice,
                product_id: checkData.product_id,
                customer_id: checkData.customer_id
            };
    
            if (values.customer_id !== checkData.customer_id) {
                console.log(values.customer_id)
                console.log(checkData.customer_id)
                if (data.product_id !== checkData.product_id) {
                    const cartItem = {
                        name: data.name,
                        price: data.price,
                        quantity: totalSelect,
                        total_price: totalPrice,
                        image: data.image,
                        product_id: data.product_id,
                        customer_id: values.customer_id,
                    };
    
                    console.log("Creating new item:", cartItem);
    
                    await axios.post('http://localhost:8081/addcart', cartItem);
                } else {
                    console.log(checkData.product_id);
                    console.log(data.product_id);
    
                    await axios.put(`http://localhost:8081/updatecart/${values.customer_id}/${data.product_id}`, updatedCheckData);
                }
            } else {
                console.log("Updating existing item:", updatedCheckData);
    
                    await axios.put(`http://localhost:8081/updatecart/${values.customer_id}/${data.product_id}`, updatedCheckData);
            }
    
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


    const checkDatafc = async () => {

        const [authResponse] = await Promise.all([
            axios.get('http://localhost:8081/auth/protected-route')
        ]);
        const result = authResponse.data;

        const customerResponse = await axios.get(`http://localhost:8081/getcustomerfromemail/${result.email}`);
                const customerData = customerResponse.data;
        try {
            const response2 = await axios.get(`http://localhost:8081/getcartitembyproductid/${customer_id}/${product_id}`);
            const cartData = response2.data;

            setCheckData({
                customer_id: customerData.customer_id
            })

            setCheckData(prevValues => ({
                ...prevValues,
                quantity: cartData.quantity,
                total_price: cartData.total_price,
                product_id: cartData.product_id
            }));
            console.log(checkData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setCheckData({
                quantity: 0,
                total_price: 0,
                product_id: 0,
                customer_id: 0,
            });
            console.log(checkData);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, authResponse] = await Promise.all([
                    axios.get(`http://localhost:8081/getproductbyid/${product_id}`),
                    axios.get('http://localhost:8081/auth/protected-route')
                ]);

                const productData = productResponse.data;
                const result = authResponse.data;

                const customerResponse = await axios.get(`http://localhost:8081/getcustomerfromemail/${result.email}`);
                const customerData = customerResponse.data;

                setValues({
                    customer_id: customerData.customer_id
                });

                setCheckData({
                    customer_id: customerData.customer_id
                })

                try {
                    const response2 = await axios.get(`http://localhost:8081/getcartitembyproductid/${customer_id}/${product_id}`);
                    const cartData = response2.data;
                    setCheckData(prevValues => ({
                        ...prevValues,
                        quantity: cartData.quantity,
                        total_price: cartData.total_price,
                        product_id: cartData.product_id
                    }));
                    console.log(checkData);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                    setCheckData({
                        quantity: 0,
                        total_price: 0,
                        product_id: 0,
                        customer_id: 0,
                    });
                    console.log(checkData);
                }

                if (productData) {
                    setData(productData);
                    setUpdateStock(productData.stock);
                    setTotalPrice(productData.price);

                    setValues(prevValues => ({
                        ...prevValues,
                        name: productData.name,
                        price: productData.price,
                        quantity: totalSelect,
                        total_price: totalPrice,
                        image: productData.image,
                        product_id: productData.product_id,
                    }));
                } else {
                    console.error(`Product with ID ${product_id} not found.`);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                if (!didCancel) {
                    setLoading(false);
                }
            }
        };

        let didCancel = false;

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [product_id, totalSelect, totalPrice]);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '20px' }} className="border">
            <img
              src={`http://localhost:8081/images/${data.image}`}
              alt=""
              className="product_img"
            />
          </div>
          <div style={{ flex: 1 }} className="border p-5 shadow">
            <h2>{data.name}</h2>
            <p className="card-text badge bg-secondary">{data.category_name}</p>
            <p>Stock: {data.stock > 0 ? data.stock : <p className="badge bg-danger">Out of Stock</p>}</p>
            <p>Price: {data.price}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5vh' }}>
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
        </div>
      );
      
}

export default BookPage;
