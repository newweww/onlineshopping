import "./App.css";
import React, { Componen, useState } from "react";
import Header from "./component/header";
import NavBar from "./component/nav_bar";
import Footer from "./component/footer";
import "./css/bootstrap.min.css";
import Home from "./page/Home";
import BookPage from "./page/bookpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./page/category/categoryPage";
import SearchBar from "./component/SearchItemByName/SearchBar";
import SearchResultList from "./component/SearchItemByName/SearchResultList";
import ProductList from "./admin/ProductManage/ProductList.js";
import CreateProduct from "./admin/ProductManage/CreateProduct.js";
import UpdateProduct from "./admin/ProductManage/UpdateProduct.js";
import Login from "./component/login.js";
import Dashboard from "./admin/component/Dashboard.js";
import DashboardHome from "./admin/component/Home.js";
import Layout from "./component/layout.js";
import Employee from "./admin/component/Employee.js";
import Category from "./admin/component/Category.js";
import Profile from "./admin/component/Profile.js";
import AddCategory from "./admin/component/AddCategory.js";
import AddEmployee from "./admin/component/AddEmployee.js";
import UpdateEmployee from "./admin/component/UpdateEmployee.js";


function App() {

    const [results, setResults] = useState([]);

    return (
        <div className='App'>
            <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                    <Routes>
                        <Route path="/l" element={<Layout />}>
                            <Route path="/l/home" element={<Home />} />
                            <Route path="/l/page/:product_id" element={<BookPage />} />
                            <Route path="/l/page/category/:category_name" element={<CategoryPage />} />
                        </Route>
                    </Routes>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route path="" element={<DashboardHome />} />
                            <Route path="/dashboard/employee" element={<Employee />} />
                            <Route path="/dashboard/add_employee" element={<AddEmployee />} />
                            <Route path="/dashboard/update_employee" element={<UpdateEmployee />} />
                            <Route path="/dashboard/category" element={<Category />} />
                            <Route path="/dashboard/add_category" element={<AddCategory />} />
                            <Route path="/dashboard/profile" element={<Profile />} />
                            <Route path="/dashboard/productlist" element={<ProductList />} />
                            <Route path="/dashboard/create" element={<CreateProduct />} />
                            <Route path="/dashboard/update/:product_id" element={<UpdateProduct />} />
                        </Route>
                    </Routes>
                </div>
                <Footer />
        </div>
    );
}


export default App