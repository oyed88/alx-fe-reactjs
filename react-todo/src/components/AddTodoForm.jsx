import { useState } from "react";

function AddTodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        aria-label="New todo input"
      />
      <button type="submit" className="add-btn" disabled={!inputValue.trim()}>
        Add Todo
      </button>
    </form>
  );
}

export default AddTodoForm;
