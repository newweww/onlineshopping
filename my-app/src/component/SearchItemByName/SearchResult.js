import React from 'react';
import './SearchResult.css';

function SearchResult({ result }) {
  const handleItemClick = () => {
    window.location.href = `/l/page/${result.product_id}`;
  };

  return ( 
    <div className='search-result' onClick={handleItemClick}>
      {result.name}
    </div>
  );
}

export default SearchResult;
