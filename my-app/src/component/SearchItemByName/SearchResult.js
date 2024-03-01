import React, { useEffect, useState } from 'react';
import './SearchResult.css';
import axios from 'axios';

function SearchResult({ result }) {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    handleCustomer();
  }, []);

  const handleItemClick = () => {
    if (customerData) {
      window.location.href = `/l/page/${customerData}/${result.product_id}`;
    }
  };

  const handleCustomer = () => {
    axios.get('http://localhost:8081/auth/protected-route')
      .then(authResult => {
        axios.get(`http://localhost:8081/getcustomerfromemail/${authResult.data.email}`)
          .then(res => {
            setCustomerData(res.data.customer_id);
          })
          .catch(error => {
            console.error('Error fetching customer data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  
  return ( 
    <div className='search-result' onClick={handleItemClick}>
      {result.name}
    </div>
  );
}

export default SearchResult;
