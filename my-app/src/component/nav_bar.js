import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={CustomLink} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Category" id="navbarScrollingDropdown">
              <NavDropdown.Item as={CustomLink} to="/page/category/Cartoon">
                Comic
              </NavDropdown.Item>
              <NavDropdown.Item as={CustomLink} to="/page/category/Novel">
                Novel
              </NavDropdown.Item>
              <NavDropdown.Item as={CustomLink} to="/page/category/Cooking">
                Cooking
              </NavDropdown.Item>
              <NavDropdown.Item as={CustomLink} to="/page/category/Programming">
                Study
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="#">
              Link
            </Nav.Link>
            <Nav.Link as={Link} to="#">
              Link
            </Nav.Link>
            <Nav.Link as={Link} to="#">
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})

    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default NavBar;
