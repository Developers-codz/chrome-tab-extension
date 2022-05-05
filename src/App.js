import { useState, useEffect } from "react";
import "./App.css";

import { AskName, MainTab } from "./components";

function App() {
  const [flag, setFlag] = useState(localStorage.getItem("name") !== null ? true : false);

  return <div className="App">{flag ? <MainTab /> : <AskName />}</div>;
}

export default App;
