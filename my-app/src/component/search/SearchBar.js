import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar({ setResults }) {
    const [input, setinput] = useState("");

    const fetchData = (value) => {
        fetch("http://localhost:8081/product")
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((product) => {
                return value && product && product.name && product.name.toLowerCase().includes(value)
            });
            setResults(results);
        })
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