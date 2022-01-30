import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useGlobleContext } from "../context/context";
import SearchForm from "./SearchForm";

export default function Navbar1() {
  const { user, logout } = useGlobleContext();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Twi</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="me-auto mt-2">
              <SearchForm />
            </Nav>
            {user ? (
              <Nav className="text-capitalize">
                <Nav.Link href="/">{user.name}</Nav.Link>
                <Nav.Link eventKey={2} href="#" onClick={logout}>
                  log out
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="text-capitalize">
                <Nav.Link href="/login">Log in</Nav.Link>
                <Nav.Link eventKey={2} href="/register">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
