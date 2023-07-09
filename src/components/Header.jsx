import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";
const Header = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { userReducerDispatcher, user } = useContext(UserContext);
  const { accountReducerDispatcher, account } = useContext(AccountContext);
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark">
      <Container>
        <Navbar.Brand className="d-flex ">
          <img
            className="img-flush p-1 bg-light rounded mx-2 "
            src={logo}
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
                  <div className="fs-6 fw-bold text-secondary text-capitalize">{`${account.balance}`}</div>
                ) : (
                  <div className="fs-6 fw-bold text-secondary text-capitalize">
                    *****
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
                  <Nav.Link> Transfer</Nav.Link>
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
