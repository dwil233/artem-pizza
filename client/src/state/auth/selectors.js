export const getIsAuthorized = (state) => !!state.auth.currentUser;
export const getUser = (state) => state.auth.currentUser;
