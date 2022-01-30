import React, { createContext, useContext, useReducer, useState } from "react";
import jwt_decode from "jwt-decode";
import { reducer } from "./reducer";

const initialState = {
  user: null,
  log: false,
};

if (localStorage.getItem("token")) {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = jwt_decode(token);
  // console.log(user);
  if (user.exp > Date.now() / 1000) {
    initialState.user = user;
  } else {
    localStorage.removeItem("token");
  }
}

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchInput, setSearchInput] = useState("");

  const login = (userData) => {
    dispatch({ type: "LOG_IN", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobleContext = () => {
  return useContext(AppContext);
};
