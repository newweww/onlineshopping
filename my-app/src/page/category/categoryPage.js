import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CategoryPage() {
    const { category_name } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data based on product_id
        fetch(`http://localhost:8081/page/category/${category_name}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [category_name]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    };

    const cardStyle = {
        width: 600,
        display: 'flex',
        flexDirection: 'column',
    };

    const buttonContainerStyle = {
        marginTop: 'auto',
    };


    return(
        <div className="container">
            <h2 className="text-start container-fluid p-3">{data[0].category_name}</h2>
            
            {/* Displaying data dynamically in cards */}
            <div style={cardContainerStyle}>
                {data.map((item, index) => (
                    <div className="card inline mx-4" style={cardStyle} key={index}>
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
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
