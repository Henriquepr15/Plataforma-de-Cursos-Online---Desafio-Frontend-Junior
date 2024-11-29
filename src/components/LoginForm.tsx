import React, { useState } from "react";
import "./LoginForm.css";

interface LoginFormProps {
  onRegister: (username: string, password: string) => void;
  onLogin: (username: string, password: string) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onRegister,
  onLogin,
  onClose,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      if (username.trim() === "" || password.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      onRegister(username, password);
      alert("Usuário registrado com sucesso!");
      setIsRegistering(false);
    } else {
      onLogin(username, password);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isRegistering ? "Cadastro" : "Login"}</h2>

        <label htmlFor="username">Nome de Usuário:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu nome de usuário"
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />

        <button type="submit" className="submit-btn">
          {isRegistering ? "Cadastrar" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-btn"
        >
          {isRegistering ? "Já tem uma conta? Login" : "Criar Conta"}
        </button>
        <button type="button" onClick={onClose} className="close-btn">
          Fechar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
