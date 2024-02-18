
import "./App.css";
import React, { Component } from "react";
import Header from "./component/header";
import NavBar from "./component/nav_bar";
import Footer from "./component/footer";
import "./css/bootstrap.min.css";
import Comic from "./page/comic";
import Novel from "./page/novel";
import Home from "./page/Home";
import Cooking from "./page/cooking";
import Study from "./page/study";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className='App'>
            <Header />
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/page/comic" element={<Comic />} />
                    <Route path="/page/novel" element={<Novel />} />
                    <Route path="/page/Cooking" element={<Cooking />} />
                    <Route path="/page/Study" element={<Study />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}


export default App;