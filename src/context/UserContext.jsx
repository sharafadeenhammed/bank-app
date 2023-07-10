import { createContext, useReducer, useEffect, useContext } from "react";
import AccountContext from "../context/AccountContext";
import UserReducer from "../reducers/UserReducer";
const UserContext = createContext();
let initialUser = localStorage.getItem("user");
if (initialUser) initialUser = JSON.parse(initialUser);
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
        console.log(data);
        throw new Error("user session expired");
      }
    } catch (error) {
      accountReducerDispatcher({ type: "clearacccount" });
      userReducerDispatcher({ type: "clearuser" });
      initialUser = {};
    }
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
