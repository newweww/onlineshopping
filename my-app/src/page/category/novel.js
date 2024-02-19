import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Novel() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8081/category/novel')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

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
            <h1 className="text-start">novel</h1>
            <div className="container">
            
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
    </div>
    );
}

export default Novel;