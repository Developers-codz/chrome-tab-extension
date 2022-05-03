import { useState, useEffect } from "react";
import "./App.css";

import { AskName, MainTab } from "./components";

function App() {
  const [flag, setFlag] = useState(false);
  useEffect(() =>localStorage.getItem("name") !== null ? setFlag(true) : setFlag(false),
    []);

  return <div className="App">{flag ? <MainTab /> : <AskName />}</div>;
}

export default App;
