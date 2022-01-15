import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";

function getTomorrow() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return now;
}

document
  .querySelector('meta[http-equiv="expires"]')
  .setAttribute("content", getTomorrow());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
