import { useEffect, useState, useContext } from "react";
import AccountContext from "../context/AccountContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import TransactionItem from "../components/TransactionItem";
const Transcations = () => {
  const navigate = useNavigate();
  const { account } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessgae] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!account.id) {
      navigate("/");
      return;
    }
    // fetch transactions
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transaction/account/${account.id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      const sortData = data.data;
      sortData.sort((a, b) => {
        const timeA = new Date(a.created_at);
        const timeB = new Date(b.created_at);
        return timeB - timeA;
      });
      setTransactions(sortData);
      if (sortData.length <= 0) {
        setMessgae("No Transactions Yet");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      // check if it is a network error
      if (error.message === "Failed to fetch") {
        console.log("failed to fetch newtwork error");
        setMessgae("failed to fetch recent transactions newtwork error");
        setIsLoading(false);
      } else {
        setMessgae("Something went wrong fetching transactions");
        setIsLoading(false);
      }
    }
  };

  return isLoading ? (
    <Spinner type="fixed" />
  ) : transactions.length > 0 ? (
    <Container className="formController m-auto m-3 p-5">
      <h1 className="py-5 fs-1 textController"> Trasactions</h1>
      <div className="d-flex justify-content-between align-items-center my-1 ">
        <p className="fs-5">Date</p>
        <p className="fs-5">Name</p>
        <p className="fs-5">Amount</p>
      </div>
      {transactions.map((transaction, index) => {
        return <TransactionItem key={index} transaction={transaction} />;
      })}
    </Container>
  ) : (
    <Container className="p-5 m-5 text-center">
      <h1
        className="text-danger m-2 p-2 rounded"
        style={{ backgroundColor: "rgba(200,50,50,0.2)" }}
      >
        {message}
      </h1>
    </Container>
  );
};

export default Transcations;
