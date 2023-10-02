import React from "react";
import LoginForm from "./Components/LoginForm";
import MainPage from "./Components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route> 
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
