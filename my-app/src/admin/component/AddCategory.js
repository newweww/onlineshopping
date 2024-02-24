import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
      category_name: ""
    });
    
    const handleSubmit = (e) => {
      e.preventDefault();
    
      axios.post('http://localhost:8081/addcategory', values)
        .then(res => navigate('/dashboard/category'))
        .catch(err => {
          if (err.response && err.response.status === 400) {
            console.log("Validation error:", err.response.data.error);
          } else {
            console.error("Server error:", err.message);
          }
        });
    };
  
    return (
      <div className='d-flex align-item-center flex-column mt-3'>
        <h1>Add Category</h1>
        <form className='w-50' onSubmit={handleSubmit}>
          <div class="mb-3 mt-3">
            <label for="category_name" class="form-label">category_name:</label>
            <input type="text" class="form-control" id="category_name" placeholder="Enter Category Name" name="category_name" onChange={(e) => setValues({ ...values, category_name: e.target.value })} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
}

export default Category