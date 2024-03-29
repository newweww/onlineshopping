import React, { useState } from 'react'
import NavBar from './nav_bar'
import SearchBar from './SearchItemByName/SearchBar'
import SearchResultList from './SearchItemByName/SearchResultList'
import { Outlet } from 'react-router-dom'

const Layout = ({handleLogout}) => {


    const [results, setResults] = useState([]);

    return (
        <div className='container-fluid'>
            <NavBar handleLogout={handleLogout} />
            <SearchBar setResults={setResults} />
            <SearchResultList results={results} />
            <Outlet />
        </div>
    )
}

export default Layout