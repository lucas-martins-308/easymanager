// src/auth/Login.js
import "./index.css";
import React, { useState } from "react";


function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin();
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      
      
      <div className="login-box">
        <div className="imgLogin"></div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Usuário:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
