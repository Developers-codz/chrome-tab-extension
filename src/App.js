import { useState, useEffect } from "react";
import "./App.css";

import { AskName, MainTab } from "./components/";

function App() {
  const [flag, setFlag] = useState(localStorage.getItem(false));
  // const funct = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.unsplash.com/photos/random?client_id=AgBYk9WdFOk5290DJb2lZReoAvaQrmRjrrbvd3ay4TY&query=nature&orientation=landscape"
  //     );
  //     console.log(response.data.urls.raw);
  //     setImage(response.data.urls.raw);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(
    () =>
      localStorage.getItem("name") !== null ? setFlag(true) : setFlag(false),
    []
  );

  return <div className="App">{flag ? <MainTab /> : <AskName />}</div>;
}

export default App;
