// AuthContextProvider.js

import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  user: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  // Get the initial token from localStorage
  const initialToken = localStorage.getItem("token") || null;
  const initialUser = localStorage.getItem("user") || ""; // Get the initial user's name

  // Define the state to store the token
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  // Check if the user is logged in based on the token
  const userLoggedIn = !!token;

  // Function to log in (with a token)
  const loginHandler = (token, userName) => {
    // Set the token and user name in state
    setToken(token);
    setUser(userName);

    // Store the token and user name in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", userName);
    console.log("logged IN")
 
  };

  // Function to log out
  const logoutHandler = () => {
    // Clear the token and user name from state
    setToken(null);
    setUser("");

    // Remove the token and user name from localStorage
   localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("Logged out");
  };

  // Create the context value
  const contextValue = {
    token: token,
    user: user,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  // Provide the context value to the components
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
