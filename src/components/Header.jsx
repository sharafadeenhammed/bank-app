import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
const Header = () => {
  const { userReducerDispatcher, user } = useContext(UserContext);
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark">
      <Container>
        <Navbar.Brand>
          <img
            className="img-flush p-1 bg-light rounded mx-2 "
            src={logo}
            alt="logo"
          />
          {user.id ? (
            <span className="fs-6 text-secondary">Hello {user.user_name}</span>
          ) : (
            ""
          )}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {user?.id ? (
              <>
                <Nav.Item>
                  <Nav.Link> Transfer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link> Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link> Transaction History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>Fund Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>View Documentation</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>Sign Up</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
