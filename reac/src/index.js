//es la conexión para el app.js
import React, { StrictMode } from "react";//react
import { createRoot } from "react-dom/client"; //Reaccione la biblioteca para hablar con los navegadores 
import "./styles.css"; //los estilos para tus componentes

import App from "./App"; //el componente en el que creó App.js
//unión de app.js
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);