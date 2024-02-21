import React, { useEffect, useState } from "react";
import Card from "../component/card";


function Home() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8081/hot_product')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    };

    return(
        <div className="container">
            <img src="assets/img1.jpg" className="rounded mx-auto d-block img-fluid highlight_img " alt="img1" />
            <h2 className="text-start container-fluid p-3">HOT!!!!</h2>
            <div style={cardContainerStyle}>
                {data.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Home;