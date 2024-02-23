import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
  const { product_id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.put('http://localhost:8081/update/' + product_id, values)
      .then(res => navigate('/productlist'))
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log("Validation error:", err.response.data.error);
        } else {
          console.error("Server error:", err.message);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/getproductbyid/" + product_id)
      .then((res) => {
        console.log("API Response:", res);
  
        const productData = res.data;  // Access the data directly
  
        if (productData) {
          setValues({
            name: productData.name || "",
            category_id: productData.category_id || "",
            price: productData.price || "",
            stock: productData.stock || ""
          });
        } else {
          console.log("Product data not available");
        }
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, [product_id]);
  
  
  

  return (
    <div className='d-flex align-item-center flex-column mt-3'>
      <h1>Update Book</h1>
      <form className='w-50' onSubmit={handleSubmit}>
        <div class="mb-3 mt-3">
          <label for="name" class="form-label">Name:</label>
          <input
  type="text"
  class="form-control"
  id="name"
  placeholder="Enter Product Name"
  name="Name"
  value={values?.name || ""}
  onChange={(e) => setValues({ ...values, name: e.target.value })}
/>
        </div>
        <div class="mb-3">
          <label for="category_id" class="form-label">Category:</label >
          <input type="text" class="form-control" id="category_id" placeholder="Enter category_id" name="category_id" value={values.category_id} onChange={(e) => setValues({ ...values, category_id: e.target.value })} />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price:</label >
          <input type="text" class="form-control" id="price" placeholder="Enter price" name="price" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
        </div>
        <div class="mb-3">
          <label for="stock" class="form-label">Stock:</label >
          <input type="text" class="form-control" id="stock" placeholder="Enter stock" name="stock" value={values.stock} onChange={(e) => setValues({ ...values, stock: e.target.value })} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateProduct