// import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { useState } from "react";

const HomeScreen = () => {
  const [homeScreenContent, setHomeScreenContent] = useState([
    {
      imgSrc: "./bank-image.png",
      title: "Test Bank App",
      description:
        "I am happy to have you here this is a simple bank app that imitate how bank app works.",
    },
    {
      imgSrc: "invest-image.png",
      title: "Investment",
      description:
        "Make a fixed ot flexi investment plan with us and see interest as high as 70% every month",
    },
    {
      imgSrc: "./why-image.png",
      title: "Why us ?",
      description:
        "Yes we are the right bank for you, as we are insured by the national deposit insurance, and you get free account fund at any time you want 😅",
    },
    {
      imgSrc: "./git-image.png",
      title: "Clone Front-end",
      description:
        "You are welcome to clone this app and modify it however you want you can find the frontend source code at sharafadeenhammed/bank-app on github",
    },
    {
      imgSrc: "./git-image.png",
      title: "Clone Back-end",
      description:
        "You are welcome to clone this app and modify it however you want you can find the backend source code at sharafadeenhammed/bankapp-mongodb on github ",
    },
    {
      imgSrc: "./have-fun-image.png",
      title: "Thank You",
      description:
        "I really appreciate you for taking your time checking out this app thank you and have fun",
    },
  ]);
  return (
    <>
      <Hero />
      <Container className="my-5 card-cont">
        {homeScreenContent.map((item, index) => {
          return (
            <Card
              description={item.description}
              imgSrc={item.imgSrc}
              title={item.title}
              key={index}
            />
          );
        })}
      </Container>
    </>
  );
};
export default HomeScreen;
