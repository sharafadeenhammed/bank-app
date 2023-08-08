import { useContext, useState, useRef, useEffect } from "react";
import AccountContext from "../context/AccountContext";
import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const amountRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [accountFound, setAccountFound] = useState(false);
  const [accountData, SetAccountData] = useState({});
  const [isLoadingAccount, setisLoadingAccount] = useState(false);
  const [message, setMessage] = useState("");
  const { accountReducerDispatcher, account } = useContext(AccountContext);
  const { user } = useContext(UserContext);

  // check if user is still logged in
  useEffect(() => {
    if (!user.first_name) {
      navigate("/login");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    amount: "",
  });
  const { amount, beneficiaryAccount } = formData;
  const onChangeData = async (e) => {
    if (e.target.id === "beneficiaryAccount") {
    }

    // supdating form data
    setFormData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value,
    }));

    // check amount and account validity for form submission
    if (
      amountRef.current.value > 0.0 &&
      accountFound &&
      ref.current.value.length >= 10
    ) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  // find user account
  const findAccount = async () => {
    if (ref.current.value.length === 10) {
      setisLoadingAccount(true);
      setMessage("");
      try {
        const req = await fetch(
          `${import.meta.env.VITE_BASE_URL}/account/number/${
            ref.current.value
          }`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await req.json();
        if (!req.ok) {
          throw data;
        }
        setMessage(data.data.account_holder_name);
        setisLoadingAccount(false);
        setAccountFound(true);
      } catch (error) {
        // check if its is a network error
        console.log(error);
        if (error.message === "Failed to fetch") {
          setMessage("failed to verify account intenet connection error");
        } else {
          setMessage(error.message);
        }
        setisLoadingAccount(false);
        setAccountFound(true);
      }
    }
  };
  // make transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    // check for account balance sufficiency
    if (amount > account.balance) {
      toast.error("insufficient fund");
      setisLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transaction/account/${account.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        throw res;
      }
      const fundResult = await res.json();
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

      if (!res.ok) {
        throw user;
      }
      setisLoading(false);
      accountReducerDispatcher({ payload: newAccount, type: "setaccount" });
      toast.success(`Transfer to ${beneficiaryAccount} sucessful`);

      // fetch account
      let updatedAccount = await fetch(
        `${import.meta.env.VITE_BASE_URL}/account/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      updatedAccount = await updatedAccount.json();
      updatedAccount = updatedAccount.data[0];
      accountReducerDispatcher({ payload: updatedAccount, type: "setaccount" });
      // redirect back to home page
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("cannot complete transaction at this time");
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
        <Container className="py-5">
          <h1 className="my-5 fs-1 textController">
            {" "}
            Transfer
            <p className="fs-6 py-2 lead">
              Ask your friend for their account number or use this account
              number <span className="h6 badge bg-success">1688928385</span> to
              test
            </p>
          </h1>

          <Form className="m-auto formController " onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="fs-5 fw-bold">
                Beneficiary account number
              </Form.Label>
              <div>
                <Form.Control
                  type="text"
                  ref={ref}
                  id="beneficiaryAccount"
                  onInput={findAccount}
                  onChange={onChangeData}
                  disabled={isLoadingAccount}
                  className=" input z-3 "
                  value={beneficiaryAccount}
                />
                {isLoadingAccount ? (
                  <span className="d-flex align-center">
                    <Spinner type="inline" size="15px" />
                  </span>
                ) : !isLoadingAccount && accountFound ? (
                  <p className="lead fs-6  ">
                    <span
                      className={"d-inline-block bg-light p-2 rounded fw-700 "}
                    >
                      {message}
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </div>

              <Form.Label className="fs-5 fw-bold">Amount</Form.Label>
              <Form.Control
                type="number"
                ref={amountRef}
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
              value="Send"
              disabled={!isSubmit}
            ></Form.Control>
          </Form>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default Transfer;
