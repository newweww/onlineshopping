import React, { useEffect, useState } from "react";
import Card from "../component/card";

function Home() {
    const [hotProduct, setHotProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);

    useEffect(() => {
        hotProducts();
        newProducts();
    }, []);

    const hotProducts = () => {
        fetch('http://localhost:8081/hot_product')
            .then(res => res.json())
            .then(data => setHotProduct(data))
            .catch(err => console.log(err));
    }

    const newProducts = () => {
        fetch('http://localhost:8081/new_product')
            .then(res => res.json())
            .then(data => setNewProduct(data))
            .catch(err => console.log(err));
    }

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
        <div className="container" style={{ paddingBottom: '50px' }}>
            <h2 className="text-start container-fluid p-3">HOT!!!!</h2>
            <div style={cardContainerStyle}>
                {hotProduct.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <Card item={item} />
                    </div>
                ))}
            </div>
            <h2 className="text-start container-fluid p-3">NEW!!!!</h2>
            <div style={cardContainerStyle}>
                {newProduct.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <Card item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
