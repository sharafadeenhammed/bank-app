const UserReducer = (initialState, action) => {
  switch (action.type) {
    case "setuser":
      return action.payload;
    case " clearuser":
      return {};
    default:
      return { ...initialState };
  }
};
export default UserReducer;
