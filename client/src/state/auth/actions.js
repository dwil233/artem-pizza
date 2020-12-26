export const authLogin = (payload) => ({
  type: "auth/login",
  payload,
});

export const authLogout = () => ({ type: "auth/logout" });
