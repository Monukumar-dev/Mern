import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function  Header() {
  const auth = localStorage.getItem('user-info');
  const navigate = useNavigate();

  const logout =()=> {
    localStorage.clear();
    navigate('/login');
    console.log("Logout successfuly");
  }

  return (
    <div>
          <Navbar className="mainMenu" bg="primary" variant="dark">
            <Container>
            <Navbar.Brand href="/">E-Com</Navbar.Brand>
            

            {
                auth ?<Nav className="me-auto">
              <Link className="nav-link" to="/">Product List</Link>
              <Link className="nav-link" to="/add">Add Product</Link>
              <NavDropdown title={JSON.parse(auth).name} id="basic-nav-dropdown">
                  <Link className="dropdown-item" to="/profile">Profile</Link>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item" onClick={logout} to="/login">Logout</Link>
              </NavDropdown>
              </Nav>
              :
              <Nav className="text-end">
                <Link className="nav-link" to="/register">Register</Link>
                <Link className="nav-link" to="/login">Login</Link>
              </Nav>
                }
                
            
              
          
            </Container>
          </Navbar>
        </div>
  );
}

export default Header;
