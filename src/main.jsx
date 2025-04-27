import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard.jsx";
import New from "./New.jsx";
import Impressum from "./Impressum.jsx";
import Edit from "./Edit.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:index" element={<Edit />} />
        </Routes>
        <Impressum />
      </>
    </BrowserRouter>
  </StrictMode>
);

