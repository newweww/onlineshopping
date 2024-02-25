import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'

const Profile = () => {
  const { email } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getemployeefromemail/${email}`);
        const employeeData = response.data;

        if (employeeData) {
          setData(employeeData);
        } else {
          console.error(`Product with ID ${email} not found.`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <img
        src={`http://localhost:8081/images/${data.image}`}
        alt=""
        className='profile_image'
      />
      <h3>Name: {data.name}</h3>
      <h3>Lastname: {data.lastname}</h3>
      <h3>Email: {data.email}</h3>
      <h3>salary: {data.salary}</h3>
    </div>
  );
};

export default Profile;
