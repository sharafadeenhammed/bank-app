import { createContext, useState, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";
const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, {});
  return (
    <UserContext.Provider
      value={{
        userReducerDispatcher: dispatch,
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
