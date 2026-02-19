# react-todo

A fully functional Todo List React application with comprehensive Jest + React Testing Library test suite.

## Features

- ✅ Add new todos via form input
- ✅ Toggle todos between completed / not completed
- ✅ Delete individual todos
- ✅ Live remaining tasks counter
- ✅ 20+ tests covering all functionality

## Getting Started

```bash
npm install
```

### Run Tests

```bash
npm test
```

### Development Server

```bash
npm start
```

## Project Structure

```
react-todo/
├── src/
│   ├── components/
│   │   ├── TodoList.jsx       # Main list component with state
│   │   └── AddTodoForm.jsx    # Controlled form component
│   ├── __tests__/
│   │   └── TodoList.test.js   # All component tests
│   ├── App.jsx
│   └── index.css
├── __mocks__/
│   └── styleMock.js           # CSS mock for Jest
├── babel.config.js
└── package.json
```

## Test Coverage

| Area | Tests |
|---|---|
| Initial render | 5 tests |
| Adding todos | 6 tests |
| Toggling todos | 4 tests |
| Deleting todos | 5 tests |
| AddTodoForm unit | 4 tests |
| **Total** | **24 tests** |

## Tech Stack

- React 18
- Jest 29
- React Testing Library 14
- Babel (JSX transform)
