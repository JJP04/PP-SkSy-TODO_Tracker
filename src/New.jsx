import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function New() {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Zum Navigieren zurück zur To-Do Liste

  const handleSubmit = () => {
    if (!name || !dueDate) {
      setError("Bitte alle Felder ausfüllen!");
      return;
    }

    const newTodo = { name, dueDate };

    // Laden der aktuellen To-Dos aus dem Local Storage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(newTodo);

    // Speichern im Local Storage
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    // Zurücksetzen des Formulars
    setName("");
    setDueDate("");
    setError("");

    // Navigiere zurück zur To-Do Liste
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1 className="display-4">Neues To-Do erstellen</h1>
      </div>

      {/* Formular zum Hinzufügen eines neuen To-Dos */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name des To-Dos
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Fälligkeitsdatum
        </label>
        <input
          type="date"
          id="dueDate"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button
        className="btn btn-primary position-fixed"
        style={{ bottom: 230, right: 35, zIndex: 1000 }}
        onClick={handleSubmit}
      >
        To-Do hinzufügen
      </button>

      <div className="d-flex justify-content-between mt-4">
        <Link
          to="/"
          className="btn btn-secondary position-fixed"
          style={{ bottom: 70, right: 30, zIndex: 1000 }}
        >
          Zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}
