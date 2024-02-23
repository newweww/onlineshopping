
import "./App.css";
import React, { Componen, useState } from "react";
import Header from "./component/header";
import NavBar from "./component/nav_bar";
import Footer from "./component/footer";
import "./css/bootstrap.min.css";
import Home from "./page/Home";
import BookPage from "./page/bookpage";
import {  BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import CategoryPage from "./page/category/categoryPage";
import SearchBar from "./component/SearchItemByName/SearchBar";
import SearchResultList from "./component/SearchItemByName/SearchResultList";
import ProductList from "./page/ProductManage/ProductList";
import CreateProduct from "./page/ProductManage/CreateProduct";
import UpdateProduct from "./page/ProductManage/UpdateProduct";
import Login from "./component/login.js";


function App() {

    const [results, setResults] = useState([]);

    return (
        <div className='App'>
            <Header />
            <NavBar />
            <SearchBar setResults={setResults}/>
            <SearchResultList results={results}/>
            <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/page/:product_id" element={<BookPage />} />
                        <Route path="/page/category/:category_name" element={<CategoryPage />} />
                        <Route path="/productlist" element={<ProductList />}/>
                        <Route path="/create" element={<CreateProduct />}/>
                        <Route path="/update/:product_id" element={<UpdateProduct />}/>
                        <Route path="/login" element={<Login />}/>
                    </Routes>

            </div>
            <Footer />
        </div>
    );
}


export default App;