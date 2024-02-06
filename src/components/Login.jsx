import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <form onSubmit={handleSubmit} className="Login-form">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="Login-input"
        />
      </label>
      <button type="submit" className="Login-button">
        Login
      </button>
    </form>
  );
}

export default Login;
