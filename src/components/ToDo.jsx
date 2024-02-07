import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ToDo({ username, onBack }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/todos?username=${username}`
      );
      setTodos(response.data);
    };
    fetchTodos();
  }, [username]);

  const addTodo = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/todos`,
      {
        text: newTodo,
        completed: false,
        username,
      }
    );
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const toggleTodoCompletion = async (todoId) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/todos/${todoId}`,
      {
        completed: true,
      }
    );
    const updatedTodos = todos.map((todo) =>
      todo._id === response.data._id ? response.data : todo
    );
    setTodos(updatedTodos);
  };

  const handleBackClick = () => {
    onBack();
    navigate(`/`);
  };

  return (
    <div className="todoContainer">
      <h2 className="todoHeader">{username}'s To-Do List</h2>
      <form onSubmit={addTodo} className="todoForm">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new to-do"
          className="todoInput"
        />
        <button type="submit" className="todoButton">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            onClick={() => toggleTodoCompletion(todo._id)}
            className={todo.completed ? "completed" : ""}
            style={{ cursor: "pointer" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button className="todoButton" onClick={handleBackClick}>
        Go Back
      </button>
    </div>
  );
}

export default ToDo;
