import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MonedaProvider } from "./context/MonedaContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MonedaProvider>
    <App />
  </MonedaProvider>
);
