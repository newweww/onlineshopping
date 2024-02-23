import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../component/product";
import axios from "axios";

function BookPage() {
    const { product_id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getproductbyid/${product_id}`);
                const productData = response.data;

                if (productData) {
                    setData(productData);
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
    }, [product_id]);

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
            {/* Add more details as needed */}
        </div>
    );
}

export default BookPage;
