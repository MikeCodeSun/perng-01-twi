export const reducer = (state, action) => {
  if (action.type === "LOG_IN") {
    localStorage.setItem("token", JSON.stringify(action.payload.token));
    return { ...state, user: action.payload, log: true };
  }
  if (action.type === "LOG_OUT") {
    localStorage.removeItem("token");
    return { ...state, user: null, log: false };
  }
  return state;
};
