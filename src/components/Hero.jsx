import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
const Hero = () => {
  const { user } = useContext(UserContext);

  return user?.first_name ? (
    <Container className="p-5">
      <h1 className="d-flex align-center fs-4">
        Welcome
        <span className="mx-1 badge text-bg-info">{`${user.first_name}`}</span>
      </h1>
    </Container>
  ) : (
    <Container className="my-5 p-5 align-center">
      <div className="border rounded py-5 ">
        <p className="text-center m-auto lead fs-3 my-5 px-5">
          You're welcome as our guest <span>this is a simple bank app, </span>
          be a part of us by sign-in or sign-up if you don't have an account to
          test this application
        </p>
        <div className=" d-flex align-items-center justify-content-center ">
          <Link to="/login" className="mx-3 btn btn-primary btn-lg">
            Login
          </Link>
          <Link to="/register" className="btn btn-success btn-lg">
            Sign up
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
