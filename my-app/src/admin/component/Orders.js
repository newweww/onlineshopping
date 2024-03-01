import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = () => {
        fetch('http://localhost:8081/order')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }

    const getCustomer = () => {

    }
  
    const handleDelete = (order_id) => {
      axios.delete(`http://localhost:8081/deleteorder/${order_id}`)
        .then(res => {
          setData(data.filter(order => order.order_id !== order_id));
        })
        .catch(err => console.log(err));
    };
  
    return (
      <div className='container mt-5' style={{ paddingBottom: '50px' }} >
        <div className='d-flex justify-content-between'>
        </div>
        {data.length !== 0 ?
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">image</th>
                <th scope="col">name</th>
                <th scope="col">phone</th>
                <th scope="col">email</th>
                <th scope="col">total</th>
                <th scope="col">date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => ( 
                <tr key={order.order_id}>
                  <td>{index + 1}</td>
                  <td><img
                      src={`http://localhost:8081/images/${order.image}`}
                      alt=""
                      className='employee_image' 
                    /></td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td>{order.total_price}</td>
                  <td>{order.dates}</td>
                  <td>
                    <button type='button' onClick={() => handleDelete(order.order_id)} className='btn btn-danger btn-sm'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          : <h2>No Record</h2>
        }
      </div>
    );
  };

export default Orders