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
const Header = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { user, userReducerDispatcher } = useContext(UserContext);
  const { account, accountReducerDispatcher } = useContext(AccountContext);

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout/`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw data;
      }
      userReducerDispatcher({ type: "clearuser" });
      accountReducerDispatcher({ type: "clearaccount" });
      window.location.pathname = "/";
    } catch (error) {
      toast.error("cant log you out at the moment");
    }
  };
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
                  <Nav.Link href="/transfer">
                    Transfer <FaPaperPlane />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/profile">
                    {" "}
                    Profile <FaUser />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/transaction">
                    {" "}
                    Transaction History <FaHistory />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/fund">
                    Fund Account <FaMoneyCheck />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={logout}>
                  <Nav.Link>
                    Logout <FaArrowAltCircleLeft />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    target="_blank"
                    href="https://documenter.getpostman.com/view/20324776/2s93RNyEuB"
                  >
                    View api <FaBookOpen />
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex">
                  <Nav.Link href="/register">Sign Up</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    target="_blank"
                    href="https://documenter.getpostman.com/view/20324776/2s93RNyEuB"
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
  );
};

export default Header;
