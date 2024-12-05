// src/auth/Login.js
import "./Login.css";
import { useState } from "react";
import PropTypes from "prop-types";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Recupera os usuários do localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Encontra o usuário correspondente ao email e senha fornecidos
    const user = storedUsers.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
      // Armazena o usuário encontrado no localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Chama a função onLogin para atualizar o estado do App
      onLogin(user); // Envia o usuário para o App
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
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default Login;
