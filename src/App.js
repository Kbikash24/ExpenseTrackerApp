import React from "react";
import LoginForm from "./Components/LoginForm";
import MainPage from "./Components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { AuthContextProvider } from "./Context/AuthContext";
import Profile from "./Components/Profile";


const App = () => {
  async function AddData(formData) {
    try {
      const response = await fetch(
        "https://expensetracker-1f575-default-rtdb.firebaseio.com/ProfileData.json",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const Data = await response.json();
      console.log("Data:", Data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
    <AuthContextProvider> <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route> 
        <Route path="/profile" element={<Profile onSubmit={AddData}/>}></Route>
        </Routes>
      </BrowserRouter></AuthContextProvider>

     
    </>
  );
};

export default App;
