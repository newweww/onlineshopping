import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CategoryList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8081/category')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (category_id) => {
        axios.delete(`http://localhost:8081/deletecategory/${category_id}`)
            .then(res => {
                setData(data.filter(category => category.category_id !== category_id));
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container mt-5' style={{ paddingBottom: '50px' }} >
            <div className='d-flex justify-content-between'>
                <Link to="/dashboard/add_category" className="btn btn-success" >Add Category</Link>
            </div>
            {data.length !== 0 ?
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((category, index) =>
                                <tr key={category.category_id}>
                                    <td>{index + 1}</td>
                                    <td>{category.category_name}</td>
                                    <td>
                                        <Link to={`/dashboard/updatecategory/${category.category_id}`} className='btn btn-info btn-sm me-2 '>Update</Link>
                                        <button type='button' onClick={() => handleDelete(category.category_id)} className='btn btn-danger btn-sm'>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                : <h2>No Record</h2>
            }
        </div>
    )
}

export default CategoryList