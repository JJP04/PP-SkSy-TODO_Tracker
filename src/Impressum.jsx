import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Impressum() {
  return (
    <footer
      className="text-center p-3 mt-4 border-top"
      style={{
        position: "fixed", // Feste Position
        bottom: 0, // Am unteren Rand
        left: 0, // Links ausgerichtet
        width: "100%", // Volle Breite
        backgroundColor: "#fff", // Sicherstellen, dass der Footer sichtbar bleibt
      }}
    >
      Julian Pokorny · 10407 Berlin · Tel.: 123456789 ·
      E-Mail: j.pokorny@campus.tu-berlin.de
    </footer>
  );
}
