import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookPage() {
    const { product_id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data based on product_id
        fetch(`http://localhost:8081/product/${product_id}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [product_id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>{data.name}</h2>
            <p>{data.category_name}</p>
            <p>Price: {data.price}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default BookPage;
