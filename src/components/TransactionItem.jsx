import { Link } from "react-router-dom";
const TransactionItem = ({ transaction }) => {
  const time = new Date(transaction.created_at);
  return (
    <Link to={`/receipt/${transaction.id}`} className="nav-link">
      <div
        key={transaction.id}
        className="d-flex justify-content-between align-items-center my-1 border-bottom"
      >
        <p className="fs-6 lead">
          {time.toDateString()} {time.getHours()}:{time.getMinutes()}
          <br />
        </p>
        <p className="fs-5 lead">{transaction.beneficiary_name}</p>
        <p
          className={
            transaction.user_id === transaction.beneficiary_id
              ? "text-success d-flex fs-6 align-items-center"
              : " text-danger d-flex fs-6 align-items-center"
          }
        >
          {transaction.user_id === transaction.beneficiary_id ? "+" : "-"}
          {transaction.amount}
        </p>
      </div>
    </Link>
  );
};

export default TransactionItem;
