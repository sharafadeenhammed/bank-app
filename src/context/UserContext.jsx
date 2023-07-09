import { createContext, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";
const UserContext = createContext();
let initialUser = localStorage.getItem("user");
if (initialUser) initialUser = JSON.parse(initialUser);
else initialUser = {};
export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, initialUser);

  const userReducerDispatcher = (payload) => {
    dispatch(payload);
  };
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
