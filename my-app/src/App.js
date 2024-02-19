
import "./App.css";
import React, { Component } from "react";
import Header from "./component/header";
import NavBar from "./component/nav_bar";
import Footer from "./component/footer";
import "./css/bootstrap.min.css";
import Comic from "./page/category/comic";
import Novel from "./page/category/novel";
import Home from "./page/Home";
import Cooking from "./page/category/cooking";
import Study from "./page/category/study";
import BookPage from "./page/bookpage";
import {  BrowserRouter as Router, Route, Routes  } from "react-router-dom";

function App() {
    return (
        <div className='App'>
            <Header />
            <NavBar />
            <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/page/:product_id" element={<BookPage />} />
                        <Route path="/page/category/cartoon" element={<Comic />} />
                        <Route path="/page/category/novel" element={<Novel />} />
                        <Route path="/page/category/Cooking" element={<Cooking />} />
                        <Route path="/page/category/programming" element={<Study />} />
                    </Routes>

            </div>
            <Footer />
        </div>
    );
}


export default App;