import { useContext, useState, useRef, useEffect } from "react";
import AccountContext from "../context/AccountContext";
import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const Receipt = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [transaction, setTransaction] = useState("");
  const { user } = useContext(UserContext);

  // check if user is still logged in
  useEffect(() => {
    if (!user.first_name) {
      navigate("/login");
    }
    findTransction();
  }, [user]);

  // find user account
  const findTransction = async () => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transaction/${params.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await req.json();
      if (!req.ok) {
        throw data;
      }
      console.log(data.data);
      setTransaction(data.data);
      setisLoading(false);
    } catch (error) {
      console.log(error.message);
      // check if its is a network error
      if (error.message === "Failed to fetch") {
        setMessage("Failed to fetch transaction network error");
      } else {
        setMessage("Cannot find this receipt");
      }
      setisLoading(false);
    }
  };

  const formateDate = (dateString) => {
    const time = new Date(dateString);
    return `  ${time.toDateString()} ${time.getHours()}:${time.getMinutes()}`;
  };

  return isLoading ? (
    <Spinner type="fixed" />
  ) : (
    <Container className="formController m-auto m-3 p-5">
      {transaction !== "" ? (
        <>
          <h1 className="my-5 fs-1 textController">Trasaction Details</h1>
          <div className="border rounded p-2">
            <h3 className="fw-600 my-2 border-bottom">Sender</h3>
            <p className="h3 flex-wrap lead bg-light d-flex justify-content-between">
              <span>Name</span>
              {transaction.sender_name}
            </p>
            <p className="h3 flex-wrap lead bg-white d-flex justify-content-between">
              <span>Account</span>
              {transaction.sender_account_number}
            </p>
            <h3 className="fw-600 my-2 border-bottom">Beneficiary</h3>
            <p className="h3 flex-wrap lead bg-light d-flex justify-content-between">
              <span>Name</span>
              {transaction.beneficiary_name}
            </p>
            <p className="h3 flex-wrap lead bg-white d-flex justify-content-between">
              <span>Account</span>
              {transaction.sender_account_number}
            </p>
            <p className="h3 flex-wrap lead bg-light d-flex justify-content-between">
              <span>Amount</span>
              {transaction.amount}
            </p>
            <p className="h3 flex-wrap lead bg-white d-flex justify-content-between">
              <span>Date</span>
              <span>{formateDate(transaction.created_at)}</span>
            </p>
          </div>
        </>
      ) : (
        <h1
          className="text-danger my-5 p-2 rounded text-center"
          style={{ backgroundColor: "rgba(200,50,50,0.2)" }}
        >
          {message}
        </h1>
      )}
    </Container>
  );
};

export default Receipt;
