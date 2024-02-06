import React, { useState, useEffect } from "react";
import axios from "axios";

function ToDo({ username }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/todos?username=${username}`
      );
      setTodos(response.data);
    };
    fetchTodos();
  }, [username]);

  const addTodo = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/api/todos", {
      text: newTodo,
      completed: false, // Ensure new todos are marked as not completed initially
      username,
    });
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const toggleTodoCompletion = async (todoId) => {
    const response = await axios.put(
      `http://localhost:3001/api/todos/${todoId}`,
      {
        completed: true, // This assumes the endpoint automatically sets completed to true
      }
    );
    const updatedTodos = todos.map((todo) =>
      todo._id === response.data._id ? response.data : todo
    );
    setTodos(updatedTodos);
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
    </div>
  );
}

export default ToDo;
