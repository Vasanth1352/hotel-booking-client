import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ✅ Import CSS file

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    try {
      const response = await fetch("http://localhost:3000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        alert("Login Successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
