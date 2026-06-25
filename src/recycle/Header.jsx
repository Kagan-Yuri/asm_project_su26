import React from "react";
import { Navbar,Nav,Form,Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Navbar bg="success" variant="dark" expand="lg" className="px-4 d-flex justify-content-between">
        <Navbar.Brand href="/home">Book Renting Online</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex flex-row gap-3">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/book">Book</NavLink>
            <NavLink to="/order">Order</NavLink>
            <NavLink to="/userinfor">User</NavLink>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/">Logout</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex gap-4">
          <Form.Control
            type="search"
            placeholder="Search book to rent..."
            className="mr-sm-4"
          />
          <Button variant="outline-light" style={{ color: "green", backgroundColor: "black" }}>
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}
export default Header;
