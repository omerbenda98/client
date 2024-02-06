import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import ToDo from "./components/ToDo";
import "./App.css"; // Or the path to your specific CSS file

function App() {
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    setUsername(user);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            username ? (
              <Navigate replace to="/todo" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/todo"
          element={
            username ? (
              <ToDo username={username} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
