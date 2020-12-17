export const authReducer = (state = { currentUser: "" }, action) => {
  switch (action.type) {
    case "auth/login":
      return { ...state, currentUser: action.payload };
    case "auth/logout":
      return { ...state, currentUser: "" };
    default:
      return state;
  }
};
