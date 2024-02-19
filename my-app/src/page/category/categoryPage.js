import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CategoryPage() {
    const { category_name } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data based on category_name
        fetch(`http://localhost:8081/product/${category_name}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data:", data);
                if (Array.isArray(data)) {
                    setData(data);
                } else if (typeof data === 'object' && data !== null) {
                    // If data is an object, convert it into an array
                    setData([data]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [category_name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2 className="text-start container-fluid p-3">
                {data && data.length > 0 ? data[0].category_name : 'Category Not Found'}
            </h2>

            {/* Displaying data dynamically in cards */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => (
                        <div className="card inline mx-4" style={{ width: 600, display: 'flex', flexDirection: 'column' }} key={index}>
                            <img
                                className="card-img-top card_img"
                                src="/assets/img1.jpg"
                                alt=""
                            />
                            <div className="card-body" style={{ flex: '1' }}>
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.category_name}</p>
                            </div>
                            <div style={{ alignSelf: 'flex-end' }}>
                                <Link to={`/page/${item.product_id}`} className="btn btn-primary mx-2 my-2">
                                    More
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found for the specified category</p>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
