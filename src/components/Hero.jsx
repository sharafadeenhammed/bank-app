import { useContext, useState } from "react";
import { Container, AccordionCollapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
const Hero = () => {
  const { userReducerDispatcher, user } = useContext(UserContext);
  return user?.first_name ? (
    <Container className="my-5 d-flex align-items-center justify-content-around p-5">
      <h1 className="fs-1 text-dark">Welcome {user.name}</h1>
    </Container>
  ) : (
    <Container className="my-5 d-flex align-items-center justify-content-around p-5">
      <Link to="/login" className="btn btn-primary btn-lg">
        Login
      </Link>
      <Link to="/register" className="btn btn-success btn-lg">
        Sign up
      </Link>
    </Container>
  );
};

export default Hero;
