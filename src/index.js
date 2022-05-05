import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TodoProvider } from "./context/todo-context";
import { TimeProvider } from "./context/time-context";


ReactDOM.render(
  <React.StrictMode>
   <TimeProvider>
   <TodoProvider>
      <App />
    </TodoProvider>
   </TimeProvider>
  </React.StrictMode> 
  ,
  document.getElementById("root")
);
