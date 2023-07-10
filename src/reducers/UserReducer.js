const UserReducer = (initialState, action) => {
  switch (action.type) {
    case "getuser":
      console.log("get user...");
      let user = localStorage.getItem("user");
      if (user === "") return {};
      user = JSON.parse(user);
      return { ...user };
    case "setuser":
      console.log("set user...");
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "clearuser":
      localStorage.removeItem("user");
      console.log("clear user...");
      return {};
    default:
      console.log("resuling to default...");
      return { ...initialState };
  }
};
export default UserReducer;
