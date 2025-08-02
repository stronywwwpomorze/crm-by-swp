import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // <-- bardzo ważne!

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
