import { useContext } from "react";

import { Container } from "react-bootstrap";
import { useState } from "react";

import UserContext from "../context/UserContext";
import noPhoto from "../assets/no-photo.jpg";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user, userReducerDispatcher } = useContext(UserContext);
  const [userData, setUserData] = useState(user);
  const handleChange = () => {};

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container className="my-5">
      {/* first and last name */}
      <div w-100 className="flex justify-content-center">
        <img
          src={user.photo ?? noPhoto}
          alt="profile picture"
          className="img-img-flush profile-img"
        />
      </div>
      <form onSubmit={onSubmit} className="my-5">
        <div class="mb-3 row">
          <div className="col-sm-6 my-3">
            <label for="first_name" class="form-label">
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              value={userData?.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-6 my-3">
            <label for="last_name" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              value={userData?.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* email and phone number */}
        <div class="mb-3 row">
          <div className="col-sm-6 my-3">
            <label for="first_name" class="form-label">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              value={userData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-6 my-3">
            <label for="last_name" class="form-label">
              Phone Number
            </label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              value={userData?.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="my-3">
          <label for="last_name" class="form-label">
            Address
          </label>
          <input
            value={userData.address}
            id="address"
            className="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default Profile;
