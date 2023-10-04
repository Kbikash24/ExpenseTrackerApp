import React, { useState } from "react";
import './ForgetPassword.css'
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail]= useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState("");
  
    const passwordChangeHandler = (e) => {
      e.preventDefault();
      setLoading(true)
  
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDz0pafMT_oDg5zZ7kpQLMb5kEhGfW0ZmA",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setLoading(false)
          if (response.ok) {
            response.json().then((data) => {
              console.log(data);
              alert("Password reset request sent")
            })
          } else {
            response.json().then((data) => {
              if(data && data.error.message){
                  setError("SignUp not successful- " + data.error.message)
                } else{
                  setError("Some error occured!! Please try again..")
                }
            });
          }
        }).catch((err) => {
          console.log("Reset Password request not sent - " +err.message);
        });
        setEmail("");
    };
  return (
    <>
    <div> <h1>Expense Tracker</h1></div>
      <div className="container">
        <div className="header">
         <div className="underline"></div>
        </div>
        <form className="form-tag" onSubmit={passwordChangeHandler}>
          <div className="inputs">
            <p className="p-tag">Enter the registered email</p>
            <div className="input">
              <BsFillEnvelopeFill className="icon" />
              <input type="email" placeholder="Email Id" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </div>
          </div>
         < p>{error}</p>
          <div className="submit-containers">
          {!loading && <button type="submit">Send Link</button>} 
          </div>

        </form>
        <p className="p-l">
          Already a user? <Link to="/login">Login</Link>
        </p>
        {loading && <h4>Submitting Data...</h4>}
      </div>
    </>
  );
};

export default ForgetPassword;
