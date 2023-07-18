import { createContext, useReducer } from "react";
import AccountReducer from "../reducers/AccountReducer";
const AccountContext = createContext();
let initialAccount = localStorage.getItem("account");
if (initialAccount !== "undefined" && initialAccount)
  initialAccount = JSON.parse(initialAccount);
else initialAccount = {};
export const AccountContextProvider = ({ children }) => {
  const [account, dispatch] = useReducer(AccountReducer, initialAccount);

  const accountReducerDispatcher = (payload) => {
    dispatch(payload);
  };
  return (
    <AccountContext.Provider
      value={{
        accountReducerDispatcher: accountReducerDispatcher,
        account: account,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
