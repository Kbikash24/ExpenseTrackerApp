import React, { useState } from "react";
import "./LoginForm.css";
import { BsFillPersonFill,BsFillEnvelopeFill,BsUnlock } from "react-icons/bs";

const LoginForm = () => {
  const [action, setAction] = useState("Sign Up");

  const handleLoginClick = () => {
    setAction("Login");
  };

  const handleSignUpClick = () => {
    setAction("Sign Up");
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? null : (
            <div className="input">
              <BsFillPersonFill className="icon"/>
              <input type="text" placeholder="User name" />
            </div>
          )}
          <div className="input">
            <BsFillEnvelopeFill className="icon"/>
            <input type="email" placeholder="Email Id" />
          </div>
          <div className="input">
          < BsUnlock className="icon"/>
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="forget-password">
          Lost Password? <span>Click here</span>
        </div>
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={handleSignUpClick}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={handleLoginClick}
          >
            Login
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
