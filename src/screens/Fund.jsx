import { useContext, useState, useEffect } from "react";
import AccountContext from "../context/AccountContext";
import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Fund = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const { accountReducerDispatcher, account } = useContext(AccountContext);
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    amount: "",
  });
  const { amount } = formData;

  // check if user is still logged in
  useEffect(() => {
    if (!user.first_name) {
      navigate("/login");
    }
  }, [user, account]);

  const onChangeData = (e) => {
    setFormData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/account/${account.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ amount: amount }),
        }
      );
      if (!res.ok) {
        throw res;
      }
      const fundResult = await res.json();
      setisLoading(false);

      // fetch account
      let newAccount = await fetch(
        `${import.meta.env.VITE_BASE_URL}/account/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      newAccount = await newAccount.json();
      newAccount = newAccount.data[0];

      accountReducerDispatcher({ payload: newAccount, type: "setaccount" });
      if (!res.ok) {
        throw user;
      }
      toast.success(
        `account sucessfully funded with ${fundResult.data.amount}`
      );

      // fetch account
      const getAccount = await fetch(
        `${import.meta.env.VITE_BASE_URL}/account/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const updatedAccount = await updatedAccount.json();

      accountReducerDispatcher({
        payload: updatedAccount.data,
        type: "setaccount",
      });

      // redirect back to home page
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong funding your account");
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
          width: "70%",
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
          <h1 className="py-5 fs-1 textController"> Fund Account</h1>
          <Form className="m-auto formController " onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="fs-5 fw-bold">
                {`${account.account_holder_name}`}
              </Form.Label>
              <Form.Control
                type="text"
                id="account"
                disabled
                onChange={onChangeData}
                className=" input z-3 "
                value={
                  "Account Number: " +
                  account.account_number +
                  " (" +
                  account.account_type +
                  ")"
                }
              />

              <Form.Label className="fs-5 fw-bold">Amount</Form.Label>
              <Form.Control
                type="number"
                id="amount"
                onChange={onChangeData}
                required
                className="input z-3 "
                value={amount}
                placeholder="amount"
              />
            </Form.Group>
            <Form.Control
              className="my-3 btn btn-success"
              type="submit"
              value="Fund"
            ></Form.Control>
          </Form>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default Fund;
