import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const handleDelete = (index) => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    setTodos(savedTodos);
  };

  const incrementProgress = (index) => {
    const updatedTodos = [...todos];
    const currentProgress = updatedTodos[index].progress || 0;
    updatedTodos[index].progress = Math.min(currentProgress + 10, 100);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const decrementProgress = (index) => {
    const updatedTodos = [...todos];
    const currentProgress = updatedTodos[index].progress || 0;
    updatedTodos[index].progress = Math.max(currentProgress - 10, 0); // Verhindern, dass der Wert unter 0 geht
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="container mt-2">
      <h1 className="display-4 text-center mb-4">To-Do Liste</h1>

      <ul className="list-group">
        {todos.length === 0 ? (
          <p className="text-center">Es gibt keine Todos.</p>
        ) : (
          todos.map((todo, index) => (
            <li
              key={index}
              className="list-group-item shadow-sm mb-2 p-1 d-flex flex-column justify-content-between"
              style={{ minHeight: "80px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{todo.name}</h6>
                  <small className="text-muted">
                    Fällig: {new Date(todo.dueDate).toLocaleDateString()}
                  </small>

                  <div className="progress mt-1" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: `${todo.progress || 0}%` }}
                      aria-valuenow={todo.progress || 0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end ms-2">
                  <div className="d-flex mb-1">
                    <button
                      className="btn btn-info btn-sm me-1"
                      onClick={() => incrementProgress(index)}
                    >
                      +10%
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => decrementProgress(index)}
                    >
                      -10%
                    </button>
                  </div>
                  <div>
                    <Link
                      to={`/edit/${index}`}
                      className="btn btn-warning btn-sm me-1"
                    >
                      Bearbeiten
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <Link
        to="/new"
        className="btn btn-success position-fixed"
        style={{ bottom: 10, right: 80, zIndex: 1000 }}
      >
        Neues To-Do erstellen
      </Link>
    </div>
  );
}
