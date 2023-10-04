import React, { useState } from "react";
import "./MainPage.css";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthCtx.logout();
  };

  const [error, setError] = useState("");
  const isLoggedIn = localStorage.getItem("token");

  const verifyHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDz0pafMT_oDg5zZ7kpQLMb5kEhGfW0ZmA",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("token"),
        
          }),
          headers: {
            "Content-Type": "application/json",
          },
        } 
      );
       
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        const data = await res.json();
        if (data && data.error && data.error.message) {
          setError("Verification mail not sent... try again" + data.error.message);
        } else {
          setError("Some error occurred!! Please try again..");
        }
      }
    } catch (err) {
      console.error("Some error in sending verification mail - " + err);
    }
  };

  return (
    <div className="headerr">
      {isLoggedIn ? (
        <>
          <div className="title">
            <p className="heading">Welcome to Expense Tracker app</p>
            <div className="buttons">
              <div className="profile">profile</div>
              <button className="Logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="display">
            <p className="p">
              Your Profile is incomplete.
              <div className="profile-link" onClick={() => navigate("/profile")}>
                Complete now
              </div>
            </p>
          </div>
          <div className="display">
            <p className="p">
              Your email is not verified.
              <div className="profile-link" onClick={verifyHandler}>
                Verify now
              </div>
            </p>
          </div>
          <p>{error}</p>
        </>
      ) : (
        navigate("/login")
        // You can uncomment and modify this section if needed
        // <div className="headers">
        //   <button className="Login" onClick={() => navigate("/login")}>
        //     Login
        //   </button>
        // </div>
      )}
    </div>
  );
};

export default MainPage;
