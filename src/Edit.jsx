import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Edit() {
  const { index } = useParams(); // Holen des Index aus der URL
  const navigate = useNavigate(); // Zum Navigieren zurück zum Dashboard
  const maxLength = 160;

  // State für das To-Do und Fehlerbehandlung
  const [todo, setTodo] = useState({
    name: "",
    dueDate: ""
  });
  const [error, setError] = useState("");

  // Laden des To-Dos beim ersten Rendern
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos[index]) {
      setTodo(savedTodos[index]);
    } else {
      setError("Das To-Do konnte nicht gefunden werden.");
    }
  }, [index]);

  // Handler für die Formularänderungen
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value
    });
  };

  // Handler zum Speichern des To-Dos
  const handleSave = () => {
    if (!todo.name || !todo.dueDate) {
      setError("Bitte alle Felder ausfüllen!");
      return;
    }

    // Laden der aktuellen To-Dos aus dem Local Storage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Aktuelles To-Do aktualisieren
    savedTodos[index] = todo;

    // Speichern im Local Storage
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    // Zurück zum Dashboard navigieren
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-4">To-Do Bearbeiten</h1>

      {/* Fehleranzeige */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formular zum Bearbeiten des To-Dos */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name des To-Dos
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={todo.name}
          onChange={handleChange}
          maxLength={maxLength} // Maximal 160 Zeichen
        />
        <div className="form-text">
          {todo.name.length}/{maxLength} Zeichen
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Fälligkeitsdatum
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className="form-control"
          value={todo.dueDate}
          onChange={handleChange}
        />
      </div>

      {/* Speichern-Button */}
      <button className="btn btn-primary" onClick={handleSave}>
        Speichern
      </button>

      {/* Abbrechen-Link, der zurück zum Dashboard navigiert */}
      <button
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/")}
      >
        Abbrechen
      </button>
    </div>
  );
}
