import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: "",
    image: ""
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories data from the API
    fetch('http://localhost:8081/category')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category_id', values.category_id);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('image', values.image);

    axios.post('http://localhost:8081/create', formData)
      .then(res => navigate('/dashboard/productlist'))
      .catch(err => {
        console.error("Server error:", err.message);
        console.log("Server response:", err.response); 
      });
  };


  return (
    <div className='d-flex align-items-center justify-content-top flex-column vh-100 mt-4'>
      <div className='border px-5 py-3 d-flex align-items-center justify-content-top flex-column'>
        <h1>Add a Book</h1>
        <form className='w-50' onSubmit={handleSubmit}>
          <div class="mb-3 mt-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Product Name" name="Name" onChange={(e) => setValues({ ...values, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="category_id" className="form-label">Category:</label>
            <select
              className="form-select"
              id="category_id"
              name="category_id"
              value={values.category_id}
              onChange={(e) => setValues({ ...values, category_id: e.target.value })}
            >
              <option value="" disabled>Select category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
              ))}
            </select>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price:</label >
            <input type="price" class="form-control" id="price" placeholder="Enter price" name="price" onChange={(e) => setValues({ ...values, price: e.target.value })} />
          </div>
          <div class="mb-3">
            <label for="stock" class="form-label">Stock:</label >
            <input type="stock" class="form-control" id="stock" placeholder="Enter stock" name="stock" onChange={(e) => setValues({ ...values, stock: e.target.value })} />
          </div>
          <div class="mb-3 mt-3">
            <label for="image" class="form-label">Select Image:</label>
            <input type="file" class="form-control" id="imputGroupFile1" name="image" onChange={(e) => setValues({ ...values, image: e.target.files[0] })} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct