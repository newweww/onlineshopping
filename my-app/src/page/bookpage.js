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
    const [values, setValues] = useState({
        name: "",
        price: "",
        quantity: totalSelect,
        total_price: totalPrice,
        image: "",
        product_id: "",
    });

    const handlebuy = () => {

        const totalPrice = totalSelect * data.price;

        const cartItem = {
            name: data.name,
            price: data.price,
            quantity: totalSelect,
            total_price: totalPrice,
            image: data.image,
            product_id: data.product_id,
        };

        axios.post('http://localhost:8081/addcart', cartItem)
            .then(window.location.reload())
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    console.log("Validation error:", err.response.data.error);
                } else {
                    console.error("Server error:", err.message);
                }
            });
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getproductbyid/${product_id}`);
                const productData = response.data;

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
        </div>
    );
}

export default BookPage;
