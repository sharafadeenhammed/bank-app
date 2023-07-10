import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";
import Spinner from "../components/Spinner";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userReducerDispatcher, user } = useContext(UserContext);
  const { accountReducerDispatcher } = useContext(AccountContext);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    address: "",
    phone_number: "",
    password: "",
  });
  const { first_name, last_name, email, age, address, phone_number, password } =
    userData;
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
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );
      const user = await res.json();
      console.log(user);
      setisLoading(false);
      if (!res.ok) {
        throw user;
      }
      userReducerDispatcher({ payload: user.data, type: "setuser" });
      // fetch account
      let account = await fetch(
        `${import.meta.env.VITE_BASE_URL}/account/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      account = await account.json();
      account = account.data[0];
      accountReducerDispatcher({ payload: account, type: "setaccount" });
      toast.success(
        `${user.data.first_name} your account is sucessfully created`
      );
      // redirect back to home page
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong signing you up");
      setisLoading(false);
    }
  };
  return isLoading ? (
    <Spinner type="fixed" />
  ) : (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          width: "150%",
          transition: "1s",
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
          <h1 className="my-5 fs-1"> Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="fs-5 fw-bold">First Name</Form.Label>
              <Form.Control
                type="text"
                id="first_name"
                className=" input z-3  col-6"
                onChange={onChangeData}
                required
                value={first_name}
                placeholder="Enter First Name"
              />
              <Form.Label className=" fs-5 fw-bold">Last Name</Form.Label>
              <Form.Control
                id="last_name"
                type="text"
                required
                onChange={onChangeData}
                className="input w-md-50  z-3 "
                value={last_name}
                placeholder="Enter last name"
              />
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
              <Form.Label className="fs-5 fw-bold">Age</Form.Label>
              <Form.Control
                type="number"
                id="age"
                required
                onChange={onChangeData}
                className=" input z-3 "
                value={age}
                min={18}
                placeholder="Age"
              />
              <Form.Label className="fs-5 fw-bold">Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                required
                onChange={onChangeData}
                className=" input z-3 "
                value={address}
                placeholder="Address"
              />
              <Form.Label className="fs-5 fw-bold">Phone</Form.Label>
              <Form.Control
                id="phone_number"
                type="text"
                required
                className=" input z-3 "
                onChange={onChangeData}
                value={phone_number}
                placeholder="Phone Number"
              />
              <Form.Label className="fs-5 fw-bold">Enter Password</Form.Label>
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
              value="Sign Up"
            ></Form.Control>
          </Form>

          <Row className="py-3">
            <Col>
              Already Have An Account? &nbsp;
              <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUp;
