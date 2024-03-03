import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './style.css'
import Orders from './Orders';

const Invoice = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getOrders();
    }, [])


    const getOrders = () => {
        axios.get('http://localhost:8081/auth/protected-route')
            .then(result => {
                fetch(`http://localhost:8081/order/${result.data.email}`)
                    .then(res => res.json())
                    .then(data => setData(data))
                    .catch(err => console.log(err));;
            })
    }


    const cardContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: "20px",
    };

    const cardStyle = {
        width: '100%',
        flex: "0 0 calc(100% - 20px)",
        marginBottom: "20px",
        boxSizing: "border-box",
    };

    return (
        <div style={{ paddingBottom: '50px' }} >
            <div className='mx-5' style={{ textAlign: 'left' }}>
                <div>
                    <h1>Orders</h1>
                    <div className="card inline mx-4 shadow" style={cardStyle}>
                        <div className="card-body" style={{ flex: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ flex: '16%' }}>
                                <h6>#</h6>
                            </div>
                            <div style={{ flex: '16%'}}>
                                <h6>Name</h6>
                            </div>
                            <div style={{ flex: '16%' }}>
                                <h6>Phone</h6>
                            </div>
                            <div style={{ flex: '20%' }}>
                                <h6>Email</h6>
                            </div>
                            <div style={{ flex: '16%' }}>
                                <h6>Total</h6>
                            </div>
                            <div style={{ flex: '16%' }}>
                                <h6>Date</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div style={cardContainerStyle}>
                    {data.map((item, index) => (
                        <div key={index} style={cardStyle}>
                            <Orders item={item} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Invoice