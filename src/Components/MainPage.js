import React from "react";
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

  return (
    <div className="headerr">
      {AuthCtx.isLoggedIn ? (
        <>
          {" "}
          <div className="title">
            <p className="heading">Welcome to Expense Tracker app</p>
            <div className="buttons"><div className="profile">profile</div>
            <button className="Logout" onClick={handleLogout}>
            
              Logout
            </button></div>
          </div>
          <div className="display">
           <p className="p">Your Profile is incomplete.<div className="profile-link" onClick={()=>{navigate('/profile')}}>Complete now</div></p>
          </div>
          
        </>
      ) : ( navigate("/login")
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
