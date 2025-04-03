import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // ✅ Importing CSS file

const SignUp = () => {
  const [full_name, setFull_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (password !== confirm_password) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name, phone_number, email, password, confirm_password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully! ✅");
        setFull_name("");
        setPhone_number("");
        setEmail("");
        setPassword("");
        setConfirm_password("");
        navigate('/login');
      } else {
        setError(data.error || "Something went wrong ❌");
      }
    } catch (error) {
      setError("Error connecting to server ❌");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={full_name} 
            onChange={(e) => setFull_name(e.target.value)} 
            required 
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            value={phone_number} 
            onChange={(e) => setPhone_number(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirm_password} 
            onChange={(e) => setConfirm_password(e.target.value)} 
            required 
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
