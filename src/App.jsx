import React, { useState, useEffect } from "react";
import {  Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Hotels from "./components/Hotels";
import HotelDetails from "./components/HotelDetails";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> 
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Hotels" element={<Hotels/>}/>
        <Route path="/Hotels/:id" element={<HotelDetails />} />
      </Routes>
    
  );
}

export default App;
