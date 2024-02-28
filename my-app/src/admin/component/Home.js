import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DashboardHome = () => {

  const [adminTotal, setAdminTotal] = useState()
  const [productTotal, setProductTotal] = useState()
  const [saleTotal, setSaleTotal] = useState(0)
  const [admins, setAdmins] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    adminCount();
    productCount();
    AdminRecords();
    ProductRecords();
    totalSale();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:8081/auth/adminrecords')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        }
      })
  }

  const ProductRecords = () => {
    axios.get('http://localhost:8081/auth/productrecords')
      .then(result => {
        if (result.data.Status) {
          setProducts(result.data.Result)
        }
      })
  }

  const totalSale = async () => {
    try {
      const response = await axios.get('http://localhost:8081/auth/totalsales');
      if (response.data.Status) {
        setSaleTotal(response.data.TotalSales);
      }
    } catch (error) {
      console.error('Error fetching total sales:', error);
    }
  };
  
  const adminCount = () => {
    axios.get('http://localhost:8081/auth/admincount')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }

  const productCount = () => {
    axios.get('http://localhost:8081/auth/productcount')
      .then(result => {
        if (result.data.Status) {
          setProductTotal(result.data.Result[0].product)
        }
      })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Product</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {productTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h5>Sales</h5>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {saleTotal}</h5>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col mt-4 px-5 pt-3' style={{ width: '50%' }}>
          <h3>Employee List</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map(a => (
                  <tr>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className='col mt-4 px-5 pt-3' style={{ width: '50%' }}>
          <h3>Product</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map(p => (
                  <tr>
                    <td>{p.name}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome