import React, { useEffect, useState } from 'react';
import Product from '../../component/product';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8081/employee')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])
  
    const handleDelete = (emp_id) => {
      axios.delete(`http://localhost:8081/deleteemployee/${emp_id}`)
        .then(res => {
          setData(data.filter(employee => employee.emp_id !== emp_id));
        })
        .catch(err => console.log(err));
    };
  
    return (
      <div className='container mt-5 '>
        <div className='d-flex justify-content-between'>
          <Link to="/dashboard/add_employee" className="btn btn-success">Add Book</Link>
        </div>
        {data.length !== 0 ?
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">image</th>
                <th scope="col">name</th>
                <th scope="col">lastname</th>
                <th scope="col">email</th>
                <th scope="col">salary</th>
              </tr>
            </thead>
            <tbody>
              {data.map(employee => (
                
                <tr key={employee.emp_id}>
                  <td>{employee.emp_id}</td>
                  <td><img
                      src={`http://localhost:8081/images/${employee.image}`}
                      alt=""
                      style={{ maxWidth: '100px', maxHeight: '100px' }} 
                    /></td>
                  <td>{employee.name}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.email}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link to={`/dashboard/update_employee/${employee.emp_id}`} className='btn btn-info btn-sm me-2'>Update</Link>
                    <button type='button' onClick={() => handleDelete(employee.emp_id)} className='btn btn-danger btn-sm'>Delete</button>
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

export default Employee