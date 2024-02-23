import React, { useState } from 'react'
import axios from 'axios'

function Login () {

    const[values, setValues] = useState({
        email: '',
        password:''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/auth/adminlogin')
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-50 border loginForm'>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                <label htmlFor='password'><strong>Password:</strong></label>
                    <input type='password' name='password' autoComplete='off' placeholder='Enter Password' onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0' />
                </div>
                <button className='btn btn-success w-100 rounded-0'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login