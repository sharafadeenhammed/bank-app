import { createContext, useReducer, useEffect, useContext } from "react";
import AccountContext from "../context/AccountContext";
import UserReducer from "../reducers/UserReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext();
let initialUser = localStorage.getItem("user");
if (initialUser && initialUser !== "undefined")
  initialUser = JSON.parse(initialUser);
else initialUser = {};

// context provider component....
export const UserContextProvider = ({ children }) => {
  const { accountReducerDispatcher } = useContext(AccountContext);
  const userReducerDispatcher = (payload) => {
    dispatch(payload);
  };

  // check user Authorization ...
  const chechAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/getme`, {
        credentials: "include",
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("session expired");
      }
      await fetchAccount();
    } catch (error) {
      console.log(error);
      accountReducerDispatcher({ type: "clearaccount" });
      userReducerDispatcher({ type: "clearuser" });
      history.pushState(null, "login", "/");
    }
  };

  const fetchAccount = async () => {
    // fetch account
    const getAccount = await fetch(
      `${import.meta.env.VITE_BASE_URL}/account/user`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const account = await getAccount.json();
    accountReducerDispatcher({
      payload: account.data,
      type: "setaccount",
    });
  };
  const [user, dispatch] = useReducer(UserReducer, initialUser);

  useEffect(() => {
    chechAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userReducerDispatcher: userReducerDispatcher,
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
