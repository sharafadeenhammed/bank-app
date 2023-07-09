const AccountReducer = (initialState, action) => {
  switch (action.type) {
    case "getaccount":
      console.log("get account...");
      let account = localStorage.getItem("account");
      if (account === "") return {};
      account = JSON.parse(account);
      return { ...account };
    case "setaccount":
      console.log("set account...");
      localStorage.setItem("account", JSON.stringify(action.payload));
      return action.payload;
    case " clearaccount":
      localStorage.removeItem("account");
      console.log("clear account...");
      return {};
    default:
      console.log("resuling to default...");
      return { ...initialState };
  }
};
export default AccountReducer;
