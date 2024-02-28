import "./App.css";
import React, {  useState } from "react";
import Header from "./component/header";
import Footer from "./component/footer";
import "./css/bootstrap.min.css";
import Home from "./page/Home";
import BookPage from "./page/bookpage";
import { BrowserRouter as  Router , Route, Routes, useNavigate } from "react-router-dom";
import CategoryPage from "./page/category/categoryPage";
import ProductList from "./admin/ProductManage/ProductList.js";
import CreateProduct from "./admin/ProductManage/CreateProduct.js";
import UpdateProduct from "./admin/ProductManage/UpdateProduct.js";
import Login from "./component/login.js";
import Dashboard from "./admin/component/Dashboard.js";
import DashboardHome from "./admin/component/Home.js";
import Layout from "./component/layout.js";
import Employee from "./admin/component/Employee/Employee.js";
import Category from "./admin/component/Category/Category.js";
import Profile from "./admin/component/Profile.js";
import AddCategory from "./admin/component/Category/AddCategory.js";
import AddEmployee from "./admin/component/Employee/AddEmployee.js";
import UpdateEmployee from "./admin/component/Employee/UpdateEmployee.js";
import UpdateCategory from "./admin/component/Category/UpdateCategory.js";
import Register from "./component/Register.js";
import axios from "axios";
import Cart from "./component/Cart.js";
import ProfileCus from "./component/ProfileCus.js";
import Orders from "./admin/component/Orders.js";

function App() {

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
            setShowLogoutPopup(false);
        })
    };

    const handleClosePopup = () => {
        setShowLogoutPopup(false);
    };



    return (
        <div className='App'>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Routes>
                    <Route path="/l" element={<Layout handleLogout={handleLogout} />}>
                        <Route path="/l/home" element={<Home />} />
                        <Route path="/l/page/:product_id" element={<BookPage />} />
                        <Route path="/l/page/category/:category_name" element={<CategoryPage />} />
                        <Route path="/l/cart/:email" element={<Cart />} />
                        <Route path="/l/profile/:email" element={<ProfileCus/>} />
                    </Route>
                </Routes>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="/dashboard/home" element={<DashboardHome />} />
                        <Route path="/dashboard/orders" element={<Orders/>} />
                        <Route path="/dashboard/profile/:email" element={<Profile />} />

                        <Route path="/dashboard/employee" element={<Employee />} />
                        <Route path="/dashboard/add_employee" element={<AddEmployee />} />
                        <Route path="/dashboard/update_employee/:emp_id" element={<UpdateEmployee />} />

                        <Route path="/dashboard/category" element={<Category />} />
                        <Route path="/dashboard/add_category" element={<AddCategory />} />
                        <Route path="/dashboard/updatecategory/:category_id" element={<UpdateCategory />}/>

                        <Route path="/dashboard/productlist" element={<ProductList />} />
                        <Route path="/dashboard/create" element={<CreateProduct />} />
                        <Route path="/dashboard/update/:product_id" element={<UpdateProduct />} />
                    </Route>
                </Routes>
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
            <Footer />
        </div>
    );
}


export default App