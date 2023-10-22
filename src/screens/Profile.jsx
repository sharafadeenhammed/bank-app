import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import UserContext from "../context/UserContext";
import noPhoto from "../assets/no-photo.jpg";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userReducerDispatcher } = useContext(UserContext);
  const [userData, setUserData] = useState(user);
  const handleChange = (e) => {
    const data = {
      ...userData,
      [e.target.id]: e.target.value,
    };
    setUserData(data);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsEdit(false);
    setIsLoading(true);
    try {
      // updating user data
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      if (!res.ok) return toast.error("profile update fialed try again");
      const data = await res.json();
      userReducerDispatcher({ payload: data.data, type: "setuser" });
      toast.success("profile updated succesfully");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(
        "failed to update your profile check internet connection and try again"
      );
      setIsLoading(false);
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const photo = new FormData();
    photo.append("photo", e.target.files[0]);
    // console.log(photo);
    // return;
    try {
      // updating user data
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/photo`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials: "include",
        body: photo,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    console.log(photo);
  };

  return (
    <Container className="my-5">
      {isLoading ? (
        <Spinner type="fixed" />
      ) : (
        <>
          <div className="flex justify-content-center ">
            <div className="d-flex flex-column ">
              <img
                src={user.photo_url ?? noPhoto}
                alt={`${user.first_name} ${user.last_name}`}
                className="img-img-flush profile-img"
              />
              <div className="d-flex flex-direction-row">
                <form action="" onSubmit={uploadPhoto}></form>
                <label htmlFor="photo"> upload photo</label>
                <input
                  onChange={uploadPhoto}
                  // className="d-none"
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/jpeg, image/png"
                />
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit} className="my-5">
            {isEdit ? (
              <div>
                <button
                  onClick={() => setIsEdit(false)}
                  type="button"
                  className=" d-flex align-items-center btn btn-warning"
                >
                  Cancel
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="mx-2"
                  >
                    <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setIsEdit(true)}
                  type="button"
                  className=" d-flex align-items-center btn btn-primary"
                >
                  Edit Profile
                  <svg
                    className="mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#fff"
                      d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div class="mb-3 row">
              <div className="col-sm-6 my-3">
                <label htmlFor="first_name" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  class="form-control"
                  id="first_name"
                  value={userData?.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 my-3">
                <label htmlFor="last_name" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  id="last_name"
                  value={userData?.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* email and phone number */}
            <div class="mb-3 row">
              <div className="col-sm-6 my-3">
                <label htmlFor="email" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  id="email"
                  value={userData?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 my-3">
                <label htmlFor="phone" class="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  id="phone"
                  value={userData?.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-3">
              <label htmlFor="address" class="form-label">
                Address
              </label>
              <input
                value={userData.address}
                disabled={!isEdit}
                onChange={handleChange}
                id="address"
                className="form-control"
              />
            </div>
            {isEdit && (
              <button type="submit" class="btn btn-success ">
                submit profile update
              </button>
            )}
          </form>
        </>
      )}
    </Container>
  );
};

export default Profile;
