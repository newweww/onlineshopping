import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../component/product";

function BookPage() {
    const { product_id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await Product.getProductById(product_id);
                setData(productData);
            } catch (error) {
                console.error(`Error fetching product with ID ${product_id}:`, error);
            }
        };

        fetchData();
    }, [product_id]);

    if (!data) {
        return <div>Loading...</div>;
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
