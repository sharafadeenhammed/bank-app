import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./context/UserContext.jsx";
import { AccountContextProvider } from "./context/AccountContext.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import Header from "./components/Header.jsx";
import SignUp from "./screens/SignUp.jsx";
import SignIn from "./screens/SignIn.jsx";
import Profile from "./screens/Profile.jsx";
import Transfer from "./screens/Transfer.jsx";
import Transactions from "./screens/Transcations.jsx";
import Fund from "./screens/Fund.jsx";
const BrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fund" element={<Fund />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/fund" element={<Fund />} />
      <Route path="/transaction" element={<Transactions />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccountContextProvider>
      <UserContextProvider>
        <Header />
        <RouterProvider router={BrowserRouter} />
        <ToastContainer />
      </UserContextProvider>
    </AccountContextProvider>
  </React.StrictMode>
);
