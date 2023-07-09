import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href="/">
          {" "}
          <img className="img-flush" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link> About</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
