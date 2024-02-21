
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
import SearchBar from "./component/search/SearchBar";
import SearchResultList from "./component/search/SearchResultList";


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
                    </Routes>

            </div>
            <Footer />
        </div>
    );
}


export default App;