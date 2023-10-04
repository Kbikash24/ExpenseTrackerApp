// AuthContextProvider.js

import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  // Get the initial token from localStorage
  const initialToken = localStorage.getItem("token")
  const initialEmail = localStorage.getItem(" "); // Get the initial user's name

  // Define the state to store the token
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialEmail);

  // Check if the user is logged in based on the token
  const userLoggedIn = !!token;

  // Function to log in (with a token)
  const loginHandler = (token,email) => {
    let userEmail=email.replace(/[@.]/g,"")
    // Set the token and user name in state
    setToken(token);
    setUser(userEmail);

    // Store the token and user name in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("email", userEmail);
    console.log("logged IN")
 
  };

  // Function to log out
  const logoutHandler = () => {
    // Clear the token and user name from state
    setToken(null);
    setUser("");

    // Remove the token and user name from localStorage
   localStorage.removeItem("token");
    localStorage.removeItem("email");

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
