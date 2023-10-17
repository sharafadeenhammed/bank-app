import { useContext } from "react";

import UserContext from "../context/UserContext";
import { Container } from "react-bootstrap";
import noPhoto from "../assets/no-photo.jpg";

const Profile = () => {
  const { user, userReducerDispatcher } = useContext(UserContext);
  console.log(user);
  return (
    <Container className="mx-5">
      <div w-100 className="flex justify-content-center">
        <img
          src={user.photo ?? noPhoto}
          alt="profile picture"
          className="img-img-flush profile-img"
        />
      </div>
    </Container>
  );
};

export default Profile;
