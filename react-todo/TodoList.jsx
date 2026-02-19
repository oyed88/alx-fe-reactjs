import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write tests with Jest", completed: false },
  { id: 3, text: "Build awesome apps", completed: true },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1>My Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span
              className="todo-text"
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              aria-label={`Delete ${todo.text}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="todo-count">
        {todos.filter((t) => !t.completed).length} task
        {todos.filter((t) => !t.completed).length !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
}

export default TodoList;
