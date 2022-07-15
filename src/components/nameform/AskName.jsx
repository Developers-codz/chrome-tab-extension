import "./AskName.css";
import { useEffect, useState } from "react";

export const AskName = () => {
  const [name, setName] = useState("");
  const [toShow, setShow] = useState(false);
  useEffect(() => {
    name !== "" ? setShow(true) : setShow(false);
  }, [name]);
  const changeHandler = (e) => {
    setName(e.target.value);
  };
  const clickHandler = () => {
    localStorage.setItem("name", name);
    window.location.reload();
  };
  return (
    <>
      <h1 className="header1">Hello, What's your name ?</h1>
      <input className="name_input" onChange={(e) => changeHandler(e)} />
      {toShow && (
        <button className="continue_btn" onClick={clickHandler}>
          Continue {" >"}
        </button>
      )}
    </>
  );
};
