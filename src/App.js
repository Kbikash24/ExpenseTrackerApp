import React from "react";
import LoginForm from "./Components/LoginForm";
import MainPage from "./Components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { AuthContextProvider } from "./Context/AuthContext";
import Profile from "./Components/Profile";
import ForgetPassword from "./Components/ForgetPassword";


const App = () => {
  
  return (
    <>
    <AuthContextProvider> <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route> 
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/forget" element={<ForgetPassword />}></Route>
        </Routes>
      </BrowserRouter></AuthContextProvider>

     
    </>
  );
};

export default App;
