import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";
import Spinner from "../components/Spinner";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const signIn = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userReducerDispatcher, user } = useContext(UserContext);
  const { accountReducerDispatcher } = useContext(AccountContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;
  // check if user is logged in
  useEffect(() => {
    if (user.first_name) navigate("/");
  }, [user.first_name]);

  const onChangeData = (e) => {
    setUserData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      const user = await res.json();
      setisLoading(false);
      if (!res.ok) {
        throw user;
      }
      // fetch account
      const account = await fetch(
        `${import.meta.env.VITE_BASE_URL}/account/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      let accountData = await account.json();
      console.log(accountData);
      if (!account.ok) {
        throw {};
      }
      accountData = accountData.data[0];
      accountReducerDispatcher({ payload: accountData, type: "setaccount" });
      userReducerDispatcher({ payload: user.data, type: "setuser" });

      // redirect back to home page
      toast.success(`welcome ${user.data.first_name}`);
      navigate("/");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        toast.error("something went wrong check your internet connection");
      } else {
        toast.error("incorrect email or password");
      }
      setisLoading(false);
    }
  };
  return isLoading ? (
    <Spinner type="fixed" />
  ) : (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: "0",
          width: "50%",
          transition: "1s linear",
        }}
        animate={{
          width: "100%",
          opacity: "1",
          transition: "1s",
        }}
        exit={{
          opacity: 0,
          width: "150%",
          transition: "1s",
        }}
      >
        <Container className="my-5">
          <h1 className="py-5 fs-1 textController "> Sign In</h1>
          <Form className="m-auto formController " onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="fs-5 fw-bold">Enter email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                required
                onChange={onChangeData}
                className=" input z-3 "
                value={email}
                placeholder="Enter email"
              />

              <Form.Label className="fs-5 fw-bold">Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={onChangeData}
                  required
                  className=" z-3 "
                  value={password}
                  placeholder="Password"
                />
                <span
                  className="px-3 btn btn-secondary"
                  onClick={() =>
                    setShowPassword((initialState) => !initialState)
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            <Form.Control
              className="my-3 btn btn-success"
              type="submit"
              value="Login"
            ></Form.Control>

            <Row className=" py-3">
              <Col>
                don't have an account? &nbsp;
                <Link to="/register">Sign Up</Link>
              </Col>
            </Row>
          </Form>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default signIn;
