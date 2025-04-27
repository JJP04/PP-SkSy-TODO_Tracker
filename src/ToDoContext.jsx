import { createContext, useState } from 'react';

// 1. Erstelle den Context
const ToDoContext = createContext();

// 2. Definiere den Provider
export function ToDoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  return (
    <ToDoContext.Provider value={{ todos, addTodo }}>
      {children}
    </ToDoContext.Provider>
  );
}

export default ToDoContext;
