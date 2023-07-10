import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";
const Header = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { user } = useContext(UserContext);
  const { account } = useContext(AccountContext);
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark">
      <Container>
        <Navbar.Brand className="d-flex ">
          <img
            style={{ objectFit: "cover" }}
            className="img-flush p-1 bg-light rounded mx-2 "
            src={user.img_url ? user.img_url : logo}
            alt="logo"
          />

          {user.first_name ? (
            <div className="d-inline-block">
              <span className="fs-6 fw-bold text-secondary text-capitalize">{`${user.last_name} ${user.first_name}`}</span>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setShowBalance((initialState) => !initialState)}
              >
                {showBalance ? (
                  <div
                    style={{ transition: "0.5s" }}
                    className="fs-6 fw-bold text-secondary text-capitalize"
                  >{`$ ${account.balance}`}</div>
                ) : (
                  <div className="fs-6 fw-bold text-secondary text-capitalize">
                    &nbsp; *****
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {user?.first_name ? (
              <>
                <Nav.Item>
                  <Nav.Link>Transfer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link> Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link> Transaction History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/fund">Fund Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>Logout</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link target="_blank" href="https://google.com">
                    View Documentation
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link target="_blank" href="/register">
                    Sign Up
                  </Nav.Link>
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
