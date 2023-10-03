import React, { useState } from "react";
import "./LoginForm.css";
import { BsFillPersonFill, BsFillEnvelopeFill, BsUnlock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const LoginForm = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);

  const handleLoginClick = () => {
    setAction("Login");
    setIsLogin(true);
  };
  const handleSignUpClick = () => {
    setIsLogin(false);
    setAction("Sign Up");
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    let url;
    let requestbody = {
      name:name,
      email: email,
      password: password,
      returnSecureToken: true,
    };
    if (!isLogin) {
      requestbody.name = name;
    }

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDz0pafMT_oDg5zZ7kpQLMb5kEhGfW0ZmA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDz0pafMT_oDg5zZ7kpQLMb5kEhGfW0ZmA";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestbody),
        headers: {
          "content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMsg = isLogin
          ? "Authentication Failed"
          : "Registration Failed";
        throw new Error(errorMsg);
      }

      const data = await response.json();

      console.log(data);
    

      AuthCtx.login(data.idToken,isLogin ? data.displayName : name);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleAuth}>
          <div className="inputs">
            {action === "Login" ? null : (
              <div className="input">
                <BsFillPersonFill className="icon" />
                <input
                  type="text"
                  placeholder="User name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )}
            <div className="input">
              <BsFillEnvelopeFill className="icon" />
              <input
                type="email"
                placeholder="Email Id"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="input">
              <BsUnlock className="icon" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <div className="forget-password">
            Lost Password? <span>Click here</span>
          </div>
          <div className="submit-container">
            <button
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={handleSignUpClick}
              type="submit"
            >
              Sign Up
            </button>
            <button
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={handleLoginClick}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
