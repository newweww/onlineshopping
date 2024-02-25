import React, { useEffect, useState } from 'react';
import Product from '../../component/product';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await Product.getAllProducts();
        console.log(productsData); 
        setData(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (product_id) => {
    axios.delete(`http://localhost:8081/delete/${product_id}`)
      .then(res => {
        setData(data.filter(product => product.product_id !== product_id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container mt-5 '>
      <div className='d-flex justify-content-between'>
        <Link to="/dashboard/create" className="btn btn-success">Add Book</Link>
      </div>
      {data.length !== 0 ?
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">image</th>
              <th scope="col">name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.map(product => (
              
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td><img
                    src={`http://localhost:8081/images/${product.image}`}
                    alt=""
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                  /></td>
                <td>{product.name}</td>
                <td>{product.category_name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Link to={`/dashboard/update/${product.product_id}`} className='btn btn-info btn-sm me-2'>Update</Link>
                  <button type='button' onClick={() => handleDelete(product.product_id)} className='btn btn-danger btn-sm'>Delete</button>
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

export default ProductList;
