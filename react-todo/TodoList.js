import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";

// ─────────────────────────────────────────────
// TodoList Component Tests
// ─────────────────────────────────────────────

describe("TodoList Component", () => {
  // 1. Initial Render Tests
  describe("Initial Render", () => {
    test("renders the TodoList component without crashing", () => {
      render(<TodoList />);
      expect(screen.getByText("My Todo List")).toBeInTheDocument();
    });

    test("renders the initial demo todos", () => {
      render(<TodoList />);
      expect(screen.getByText("Learn React")).toBeInTheDocument();
      expect(screen.getByText("Write tests with Jest")).toBeInTheDocument();
      expect(screen.getByText("Build awesome apps")).toBeInTheDocument();
    });

    test("renders the add todo form", () => {
      render(<TodoList />);
      expect(
        screen.getByPlaceholderText("Add a new todo...")
      ).toBeInTheDocument();
      expect(screen.getByText("Add Todo")).toBeInTheDocument();
    });

    test("shows the correct initial tasks remaining count", () => {
      render(<TodoList />);
      // 2 of 3 initial todos are not completed
      expect(screen.getByText("2 tasks remaining")).toBeInTheDocument();
    });

    test("renders a completed todo with line-through style", () => {
      render(<TodoList />);
      const completedTodo = screen.getByText("Build awesome apps");
      expect(completedTodo).toHaveStyle("text-decoration: line-through");
    });
  });

  // 2. Adding Todos Tests
  describe("Adding Todos", () => {
    test("adds a new todo when form is submitted", () => {
      render(<TodoList />);
      const input = screen.getByPlaceholderText("Add a new todo...");
      const button = screen.getByText("Add Todo");

      fireEvent.change(input, { target: { value: "Buy groceries" } });
      fireEvent.click(button);

      expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    });

    test("clears the input after adding a todo", () => {
      render(<TodoList />);
      const input = screen.getByPlaceholderText("Add a new todo...");

      fireEvent.change(input, { target: { value: "New task" } });
      fireEvent.submit(input.closest("form"));

      expect(input.value).toBe("");
    });

    test("does not add a todo when input is empty", () => {
      render(<TodoList />);
      const button = screen.getByText("Add Todo");

      const initialItems = screen.getAllByRole("listitem");
      fireEvent.click(button);

      expect(screen.getAllByRole("listitem")).toHaveLength(initialItems.length);
    });

    test("does not add a todo containing only whitespace", () => {
      render(<TodoList />);
      const input = screen.getByPlaceholderText("Add a new todo...");

      const initialItems = screen.getAllByRole("listitem");
      fireEvent.change(input, { target: { value: "   " } });
      fireEvent.submit(input.closest("form"));

      expect(screen.getAllByRole("listitem")).toHaveLength(initialItems.length);
    });

    test("can add multiple todos in sequence", () => {
      render(<TodoList />);
      const input = screen.getByPlaceholderText("Add a new todo...");

      fireEvent.change(input, { target: { value: "First task" } });
      fireEvent.submit(input.closest("form"));
      fireEvent.change(input, { target: { value: "Second task" } });
      fireEvent.submit(input.closest("form"));

      expect(screen.getByText("First task")).toBeInTheDocument();
      expect(screen.getByText("Second task")).toBeInTheDocument();
    });

    test("updates the remaining count after adding a todo", () => {
      render(<TodoList />);
      const input = screen.getByPlaceholderText("Add a new todo...");

      fireEvent.change(input, { target: { value: "Extra task" } });
      fireEvent.submit(input.closest("form"));

      expect(screen.getByText("3 tasks remaining")).toBeInTheDocument();
    });
  });

  // 3. Toggling Todos Tests
  describe("Toggling Todos", () => {
    test("toggles a todo to completed when clicked", () => {
      render(<TodoList />);
      const todo = screen.getByText("Learn React");

      fireEvent.click(todo);

      expect(todo).toHaveStyle("text-decoration: line-through");
    });

    test("toggles a completed todo back to not completed", () => {
      render(<TodoList />);
      const todo = screen.getByText("Build awesome apps");

      // It starts completed; click to un-complete
      fireEvent.click(todo);

      expect(todo).toHaveStyle("text-decoration: none");
    });

    test("updates remaining count when a todo is toggled to completed", () => {
      render(<TodoList />);
      const todo = screen.getByText("Learn React");

      fireEvent.click(todo);

      expect(screen.getByText("1 task remaining")).toBeInTheDocument();
    });

    test("updates remaining count when a completed todo is toggled back", () => {
      render(<TodoList />);
      const todo = screen.getByText("Build awesome apps");

      fireEvent.click(todo); // un-complete it

      expect(screen.getByText("3 tasks remaining")).toBeInTheDocument();
    });
  });

  // 4. Deleting Todos Tests
  describe("Deleting Todos", () => {
    test("removes a todo when its delete button is clicked", () => {
      render(<TodoList />);

      const deleteBtn = screen.getByLabelText("Delete Learn React");
      fireEvent.click(deleteBtn);

      expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    });

    test("does not remove other todos when one is deleted", () => {
      render(<TodoList />);

      const deleteBtn = screen.getByLabelText("Delete Learn React");
      fireEvent.click(deleteBtn);

      expect(screen.getByText("Write tests with Jest")).toBeInTheDocument();
      expect(screen.getByText("Build awesome apps")).toBeInTheDocument();
    });

    test("updates remaining count after deleting an incomplete todo", () => {
      render(<TodoList />);

      const deleteBtn = screen.getByLabelText("Delete Learn React");
      fireEvent.click(deleteBtn);

      expect(screen.getByText("1 task remaining")).toBeInTheDocument();
    });

    test("updates remaining count correctly after deleting a completed todo", () => {
      render(<TodoList />);

      const deleteBtn = screen.getByLabelText("Delete Build awesome apps");
      fireEvent.click(deleteBtn);

      // Was already completed, so remaining count stays at 2
      expect(screen.getByText("2 tasks remaining")).toBeInTheDocument();
    });

    test("can delete all todos", () => {
      render(<TodoList />);

      const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
      deleteButtons.forEach((btn) => fireEvent.click(btn));

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });
});

// ─────────────────────────────────────────────
// AddTodoForm Component Tests
// ─────────────────────────────────────────────

describe("AddTodoForm Component", () => {
  test("renders an input and a submit button", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    expect(
      screen.getByPlaceholderText("Add a new todo...")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  test("calls onAdd with the correct value on submit", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.submit(input.closest("form"));

    expect(mockOnAdd).toHaveBeenCalledWith("Test task");
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("button is disabled when input is empty", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    expect(screen.getByText("Add Todo")).toBeDisabled();
  });

  test("button is enabled when input has text", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Add a new todo..."), {
      target: { value: "Something" },
    });

    expect(screen.getByText("Add Todo")).not.toBeDisabled();
  });
});
