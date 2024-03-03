import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";


function NavBar({ handleLogout }) {

  const navigate = useNavigate();
  const { email } = useParams();
  const [img, setImg] = useState(() => {
    const storedImg = localStorage.getItem('img');
    return storedImg ? JSON.parse(storedImg) : null;
  });
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch('http://localhost:8081/category');
        const categoryData = await categoryResponse.json();
        setData(categoryData);

        axios.get('http://localhost:8081/auth/protected-route')
          .then(result => {
            return axios.get(`http://localhost:8081/getcustomerfromemail/${result.data.email}`);
          })
          .then(customerResponse => {
            const customerData = customerResponse.data;
            setImg(customerData);
            localStorage.setItem('img', JSON.stringify(customerData));
          })
          .catch(error => {
            console.log('Error fetching customer data:', error);
          });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]);

  const handleCart = () => {
    axios.get('http://localhost:8081/auth/protected-route')
      .then(result => {
            axios.get(`http://localhost:8081/getcustomerfromemail/${result.data.email}`)
            .then(res => {
              navigate(`cart/${res.data.customer_id}`)
            });
          })
  }

  const handleProfile = () => {
    axios.get('http://localhost:8081/auth/protected-route')
      .then(result => {
        navigate(`/l/profile/${result.data.email}`)
      })
  }
  
  const handleOrder = () => {
    axios.get('http://localhost:8081/auth/protected-route')
      .then(result => {
            axios.get(`http://localhost:8081/getcustomerfromemail/${result.data.email}`)
            .then(res => {
              navigate(`orders/${res.data.customer_id}`)
            });
          })
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <div>
        <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={CustomLink} className="navBtn" to="/l/home" style={{ display: 'flex', alignItems: 'center' }}>
              <i className='fs-4 bi-house ms-2'></i>
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>Home</span>
            </Nav.Link>
          </Nav>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-2 my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll>
            <NavDropdown title="Category" className="navBtn" id="navbarScrollingDropdown" style={{fontSize: '20px'}}>
              {data.map(category => (
                <NavDropdown.Item
                  key={category.category_name}
                  as={CustomLink}
                  to={`/l/page/category/${category.category_name}`}
                >
                  {category.category_name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={CustomLink} className="navBtn" onClick={handleOrder} style={{ display: 'flex', alignItems: 'center' }}>
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>Orders</span>
            </Nav.Link>
          </Nav>
            <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={CustomLink} className="navBtn" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>Logout</span>
            </Nav.Link>
          </Nav>
          </Nav>
          <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={Link} className="navBtn" onClick={handleCart} style={{ display: 'flex', alignItems: 'center' }}>
              <i className='fs-4 bi-cart ms-2'></i>
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>Cart</span>
            </Nav.Link>
            <Nav.Link as={Link} className="navBtn" onClick={handleProfile} style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src={`http://localhost:8081/images/${img.image}`}
                alt=""
                className='mini_profile_image'
              />
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>Profile</span>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default NavBar;
