import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

const UpdateEmployee = () => {
  const { emp_id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    salary: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:8081/updateemployee/' + emp_id, values)
      .then(res => navigate('/dashboard/employee'))
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
      .get("http://localhost:8081/getemployeebyid/" + emp_id)
      .then((res) => {
        console.log("API Response:", res);

        const employeeData = res.data;
        if (employeeData) {
          setValues({
            name: employeeData.name || "",
            lastname: employeeData.lastname || "",
            email: employeeData.email || "",
            password: employeeData.password || "",
            salary: employeeData.salary || ""
          });
        } else {
          console.log("Employee data not available");
        }
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, [emp_id]);

  return (
    <div className='d-flex align-items-center justify-content-top flex-column vh-100 mt-4'>
      <div className='border px-5 py-3 d-flex align-items-center justify-content-top flex-column'>
        <h1>Update Employee</h1>
        <form className='w-40' onSubmit={handleSubmit}>
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
            <label for="lastname" class="form-label">Lastname:</label >
            <input type="text" class="form-control" id="lastname" placeholder="Enter lastname" name="lastname" value={values.lastname} onChange={(e) => setValues({ ...values, lastname: e.target.value })} />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">email:</label >
            <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">password:</label >
            <input type="text" class="form-control" id="password" placeholder="Enter password" name="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </div>
          <div class="mb-3">
            <label for="salary" class="form-label">Salary:</label >
            <input type="text" class="form-control" id="salary" placeholder="Enter salary" name="salary" value={values.salary} onChange={(e) => setValues({ ...values, salary: e.target.value })} />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateEmployee