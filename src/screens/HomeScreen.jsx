import Header from "../components/Header";
import Hero from "../components/Hero";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
};
export default HomeScreen;
