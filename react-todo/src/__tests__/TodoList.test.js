import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders the TodoList component", () => {
    render(<TodoList />);
    expect(screen.getByText("My Todo List")).toBeInTheDocument();
  });

  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests with Jest")).toBeInTheDocument();
    expect(screen.getByText("Build awesome apps")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(input.closest("form"));
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles a todo", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});