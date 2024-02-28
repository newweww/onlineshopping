import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css"
import "./Dashboard.css";

const Dashboard = () => {

    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true

    const handleLogout = () => {
        setShowLogoutPopup(true);
    };

    const handleConfirmLogout = () => {
        axios.get('http://localhost:8081/auth/logout')
        .then(result => {
            if(result.data.Status) {
                navigate('/')
            }
        })
    };

    const handleProfile = () => {
        axios.get('http://localhost:8081/auth/protected-route')
        .then(result => {
            navigate(`/dashboard/profile/${result.data.email}`)
        })
    }

    const handleClosePopup = () => {
        setShowLogoutPopup(false);
    };

    return (
        <div className='container-fluid'>
            <div className='row flex-nowrap '>
                <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                    <div className='d- flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <Link to="/dashboard" className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                            <span className='fs-5 fw-bolder d-none d-sm-inline'>
                                Hello World
                            </span>
                        </Link>
                        <ul className='nav nav-pill flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                            <li className='w-100'>
                                <Link to='/dashboard/home' className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-speedmeter2 ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/orders' className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-people ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>orders</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/employee' className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-people ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Manage Employee</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/productlist' className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-people ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Manage Product</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/category' className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-columns ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Category</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link onClick={handleProfile} className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-person ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Profile</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link className='nav-link px-0 align-middle text-white' onClick={handleLogout}>
                                    <i className='fs-4 bi-power ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col p-0 m-0'>
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Employee Mangemwnt System</h4>
                    </div>
                    <Outlet />
                </div>
                {showLogoutPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <p>Are you sure you want to logout?</p>
                            <button className='btn btn-success m-3' onClick={handleConfirmLogout}>Yes</button>
                            <button className='btn btn-danger m-3' onClick={handleClosePopup}>No</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
