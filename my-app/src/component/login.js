import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/auth/login', values)
            .then(result => {
                console.log(result.data.role)
                if (result.data.loginStatus == true) {
                    if (result.data.role == 'admin') {
                        navigate('/dashboard/home')
                    } else {
                        navigate('/l/home')
                    }
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-50 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password:</strong></label>
                        <input type='password' name='password' autoComplete='off' placeholder='Enter Password' onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Login</button>
                </form>
                <Link to="/register" className="btn">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Login