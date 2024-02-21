import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'; 
import './SearchBar.css'
import Product from '../product';

function SearchBar({ setResults }) {
    const [input, setinput] = useState("");

    const fetchData = async (value) => {
        const getProduct = await Product.getAllProducts();
        const results = getProduct.filter((Product) => {
          return value && Product && Product.name && Product.name.toLowerCase().includes(value);
        });
        setResults(results);
      };

    const handleChange = (value) => {
        setinput(value);
        fetchData(value);
    };

    return ( 
        <div className='input-wrapper'>
            <FaSearch id="search-icon" />
            <input placeholder='Type to search....' 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}/>
        </div>
        
     );
}

export default SearchBar;