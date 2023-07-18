const UserReducer = (initialState, action) => {
  switch (action.type) {
    case "getuser":
      let user = localStorage.getItem("user");
      if (user === "") return {};
      user = JSON.parse(user);
      return { ...user };
    case "setuser":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "clearuser":
      localStorage.removeItem("user");
      return {};
    default:
      return { ...initialState };
  }
};
export default UserReducer;
