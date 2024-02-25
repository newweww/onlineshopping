import React, { useEffect, useState } from "react";
import Card from "../component/card";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/hot_product')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    const cardContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '20px',
    };

    const cardStyle = {
        flex: '0 0 calc(30% - 20px)', // 30% width with a margin of 20px
        marginBottom: '20px',
        boxSizing: 'border-box', // Include padding and border in the width
    };

    return (
        <div className="container">
            <h2 className="text-start container-fluid p-3">HOT!!!!</h2>
            <div style={cardContainerStyle}>
                {data.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <Card item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
