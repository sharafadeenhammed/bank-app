import { Link } from "react-router-dom";
const TransactionItem = ({ transaction }) => {
  const time = new Date(transaction.created_at);
  return (
    <>
      <tr>
        <td>
          <p className="fs-6 lead">
            {time.toDateString()} {time.getHours()}:{time.getMinutes()}
          </p>
        </td>
        <td>
          <p className="fs-5 lead">{transaction.beneficiary_name}</p>
        </td>
        <td>
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
        </td>
        <td>
          <Link to={`/receipt/${transaction.id}`} className="btn btn-primary">
            view
          </Link>
        </td>
      </tr>
    </>
  );
};

export default TransactionItem;
