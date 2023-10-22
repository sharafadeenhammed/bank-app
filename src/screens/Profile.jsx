import { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";
import UserContext from "../context/UserContext";
import noPhoto from "../assets/no-photo.jpg";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userReducerDispatcher } = useContext(UserContext);
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user]);
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
        method: "PUT",
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
    // phot upload...
    e.preventDefault();
    const photo = new FormData();
    photo.append("photo", e.target.files[0]);
    const value = photo.values();
    setIsLoading(true);
    try {
      // updating user data
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: "POST",
        credentials: "include",
        body: photo,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      userReducerDispatcher({ payload: data.data, type: "setuser" });
      setUserData(data.data);
      setIsLoading(false);
      toast.success("profile photo upload sucesfully");
    } catch (err) {
      console.log(err);
      if (err.message === "Failed to fetch") {
        setIsLoading(false);
        toast.success("photo upload erro check internet connection!");
        return;
      }
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Container className="my-5">
      {isLoading ? (
        <Spinner type="fixed" />
      ) : (
        <>
          <div className="flex justify-content-center ">
            <div className="d-flex flex-column align-items-center ">
              <img
                src={user.photo_url ?? noPhoto}
                alt={`${user.first_name} ${user.last_name}`}
                className="img-img-flush profile-img"
              />
              <div className="d-flex align-items-center">
                <label className="btn btn-secondary btn-sm" htmlFor="photo">
                  change photo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className=" mx-2"
                    fill="#fff"
                  >
                    <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                  </svg>
                </label>
                <input
                  onChange={uploadPhoto}
                  className="d-none"
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
            <div className="mb-3 row">
              <div className="col-sm-6 my-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  className="form-control"
                  id="first_name"
                  value={userData?.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 my-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  id="last_name"
                  value={userData?.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* email and phone number */}
            <div className="mb-3 row">
              <div className="col-sm-6 my-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  id="email"
                  value={userData?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 my-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEdit}
                  readOnly={!isEdit}
                  id="phone"
                  value={userData?.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-3">
              <label htmlFor="address" className="form-label">
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
              <button type="submit" className="btn btn-success ">
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
