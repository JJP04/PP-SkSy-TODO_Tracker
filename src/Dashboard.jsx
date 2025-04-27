import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="display-4 text-center mb-4">To-Do Liste</h1>
      <ul className="list-group">
        {todos.length === 0 ? (
          <p className="text-center">Es gibt keine Todos.</p>
        ) : (
          todos.map((todo, index) => (
            <li
              key={index}
              className="list-group-item shadow-sm mb-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <h4>{todo.name}</h4>
                <p>{todo.description}</p>
                <p className="text-muted">
                  Fällig am: {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              </div>

              <Link
                to="/new"
                className="btn btn-success position-fixed"
                style={{ bottom: 10, right: 30, zIndex: 1000 }}
              >
                Neues To-Do erstellen
              </Link>

              <Link
                to={`/edit/${index}`}
                className="btn btn-success"
               
              >
                Edit
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
