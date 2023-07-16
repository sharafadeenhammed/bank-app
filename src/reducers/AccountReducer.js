const AccountReducer = (initialState, action) => {
  switch (action.type) {
    case "getaccount":
      let account = localStorage.getItem("account");
      if (account === "") return {};
      account = JSON.parse(account);
      return { ...account };
    case "setaccount":
      localStorage.setItem("account", JSON.stringify(action.payload));
      return action.payload;
    case "clearaccount":
      localStorage.removeItem("account");
      return {};
    default:
      console.log("resuling to default...");
      return { ...initialState };
  }
};
export default AccountReducer;
