import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";
import {
  FaMoneyCheck,
  FaPaperPlane,
  FaArrowAltCircleLeft,
  FaUser,
  FaHistory,
  FaBookOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const { user, userReducerDispatcher } = useContext(UserContext);
  const { account, accountReducerDispatcher } = useContext(AccountContext);

  const logout = async () => {
    console.log("log out");
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout/`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw data;
      }
      userReducerDispatcher({ type: "clearuser" });
      accountReducerDispatcher({ type: "clearaccount" });
      document.cookie = `token= ""; expires=${new Date(0)}`;
      navigate("/");
    } catch (error) {
      toast.error("cant log you out at the moment");
    }
  };
  return (
    <>
      {/* <LinkContainer></LinkContainer> */}
      <Navbar
        expand="lg"
        className=" position-fixed w-100 top-0 navbar-dark bg-dark"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand className="d-flex ">
            <LinkContainer to="/" style={{ cursor: "pointer" }}>
              <img
                style={{ objectFit: "cover" }}
                className="img-flush p-1 bg-light rounded mx-2 "
                src={user.img_url ? user.img_url : logo}
                alt="logo"
              />
            </LinkContainer>
            {user.first_name ? (
              <div className="d-inline-block">
                <span className="fs-6 fw-bold text-secondary text-capitalize">{`${user.first_name} ${user.last_name}`}</span>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowBalance((initialState) => !initialState)
                  }
                >
                  {showBalance ? (
                    <div
                      style={{ transition: "0.5s" }}
                      className="fs-6 fw-bold text-secondary text-capitalize"
                    >{`$ ${account.balance.toFixed(2)}`}</div>
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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user?.first_name ? (
                <>
                  <Nav.Item>
                    <LinkContainer to="/transfer">
                      <Nav.Link>
                        Transfer <FaPaperPlane />
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/profile">
                      <Nav.Link>
                        {" "}
                        Profile <FaUser />
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/transaction">
                      <Nav.Link>
                        {" "}
                        Transaction History <FaHistory />
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/fund">
                      <Nav.Link>
                        Fund Account <FaMoneyCheck />
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item onClick={logout}>
                    <Nav.Link>
                      Logout <FaArrowAltCircleLeft />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      target="_blank"
                      href="https://documenter.getpostman.com/view/20324776/2s946iaqNP"
                    >
                      View api <FaBookOpen />
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>

                  <Nav.Item className="d-flex">
                    <LinkContainer to="/register">
                      <Nav.Link>Sign Up</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      target="_blank"
                      href="https://documenter.getpostman.com/view/20324776/2s946iaqNP"
                    >
                      View api
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
