import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCategory = () => {
    const { category_id } = useParams()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        category_name: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8081/updatecategory/' + category_id, values)
            .then(res => navigate('/dashboard/category'))
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
            .get("http://localhost:8081/getcategorybyid/" + category_id)
            .then((res) => {
                console.log("API Response:", res);
                const categoryData = res.data;
                if (categoryData) {
                    setValues({
                        category_name: categoryData.category_name || "",
                    });
                } else {
                    console.log("Category data not available");
                }
            })
            .catch((err) => console.log("Error fetching data:", err));
    }, [category_id]);


    return (
        <div className='d-flex align-items-center justify-content-top flex-column vh-100 mt-4'>
            <div className='border px-5 py-3 d-flex align-items-center justify-content-top flex-column'>
                <h1>Update category</h1>
                <form className='w-40' onSubmit={handleSubmit}>
                    <div class="mb-3 mt-3">
                        <label for="category_name" class="form-label">category name:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="category_name"
                            placeholder="Enter category Name"
                            name="category"
                            value={values?.category_name || ""}
                            onChange={(e) => setValues({ ...values, category_name: e.target.value })}
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategory