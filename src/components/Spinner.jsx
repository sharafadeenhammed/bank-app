import { Container } from "react-bootstrap";
import spinner from "../assets/spinner.gif";
const Spinner = ({ type, size, spinnerStyle }) => {
  const styles = {
    fixed: {
      position: "fixed",
      diplay: "block",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: size || "70px",
      overFlow: "hidden",
      contain: "content",
    },
    inline: {
      display: "inline-block",
      marginRight: "10px",
      marginLeft: "10px",
      height: size || "10px",
      position: "static",
      transform: "translate(0%)",
      overFlow: "hidden",
      contain: "content",
    },
  };
  return <img style={{ ...styles[type], ...spinnerStyle }} src={spinner} />;
};

export default Spinner;
