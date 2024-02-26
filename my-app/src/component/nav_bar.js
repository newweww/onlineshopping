import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProductList from "../admin/ProductManage/ProductList";

function NavBar({ handleLogout }) {

  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8081/category')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={CustomLink} to="/l/home">
        <i class="bi bi-house mx-2" s></i>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-2 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavDropdown title="Category" id="navbarScrollingDropdown">
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
            <Nav.Link as={Link} to="/ProductList">
              Manage
            </Nav.Link>
            <Nav.Link as={Link} onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/l/cart" style={{ display: 'flex', alignItems: 'center' }}>
              <i className='fs-4 bi-cart ms-2'></i>
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px'}}>Cart</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/l/cart" style={{ display: 'flex', alignItems: 'center' }}>
              <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px'}}>Profile</span>
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
