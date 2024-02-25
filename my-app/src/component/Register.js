import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const AddCustomer = () => {

    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: "",
        lastname: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('lastname', values.lastname);
        formData.append('phone', values.phone);
        formData.append('address', values.address);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('image', image);
    
        axios.post('http://localhost:8081/register', formData)
            .then(res => navigate('/'))
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    console.log("Validation error:", err.response.data.error);
                } else {
                    console.error("Server error:", err.message);
                }
            });
    };

    const [image, setImage] = useState('')
    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
        setValues({ ...values, image: e.target.files[0] });
    };
    

    return (
        <div className='d-flex align-items-center justify-content-top flex-column vh-100 mt-4'>
            <div className='border px-5 py-3 d-flex align-items-center justify-content-top flex-column'>
                <h1>Add Employee</h1>
                <form className='w-100' onSubmit={handleSubmit}>
                    <div class="mb-3 mt-3">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name" onChange={(e) => setValues({ ...values, name: e.target.value })} name="name" />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="lastname" class="form-label">Lastname:</label>
                        <input type="text" class="form-control" id="lastname" placeholder="Enter Lastname" onChange={(e) => setValues({ ...values, lastname: e.target.value })} name="lastname" />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="phone" class="form-label">Phone:</label>
                        <input type="text" class="form-control" id="phone" placeholder="Enter phone" onChange={(e) => setValues({ ...values, phone: e.target.value })} name="phone" />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="address" class="form-label">address:</label>
                        <input type="text" class="form-control" id="address" placeholder="Enter address" onChange={(e) => setValues({ ...values, address: e.target.value })} name="address" />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="text" class="form-control" id="email" placeholder="Enter Email" onChange={(e) => setValues({ ...values, email: e.target.value })} name="email" />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="password" class="form-label">Password:</label>
                        <input type="text" class="form-control" id="password" placeholder="Enter Password" onChange={(e) => setValues({ ...values, password: e.target.value })} name="password" />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="image" class="form-label">Select Image:</label>
                        <input type="file" class="form-control" id="image" onChange={handleImageChange} name="image" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddCustomer