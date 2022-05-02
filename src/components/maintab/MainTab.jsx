import "./style.css";
import { SettingIcon, Edit, Delete } from "../../assets/icons";
import { TodoList, Weather, Quote } from "../";
import { useTodo } from "../../context/todo-context";
import { useTime } from "../../context/time-context";
import { useState, useEffect } from "react";


export const MainTab = () => {

  const { todoDispatch } = useTodo();
  const { time:{h, m, session, greetings }} = useTime();

  const userName = localStorage.getItem("name");
  const [isOpen, setOpen] = useState({
    settingBtn: false,
    focusForm: true,
    todo: false,
  });
  const [focusText, setFocusText] = useState({ text: "", status: false });

  // useEffect(() => {
  //   let todo = JSON.parse(localStorage.getItem("todo"));
  //   if (todo !== null) todoDispatch({ type: "SET_TODO", payload: todo });
  // }, []);



  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("focus")) !== null) {
  //     const { focus, focusState } = JSON.parse(localStorage.getItem("focus"));
  //     setFocusText((focusText) => ({
  //       ...focusText,
  //       text: focus,
  //       status: focusState,
  //     }));
  //   }
  // }, []);


  //  for reset the user
  
  const nameHandler = () => {
    localStorage.removeItem("name");
    window.location.reload();
  };

  const focusTextHandler = (e) => {
    if (e.key === "Enter") {
      console.log("I pressed")
      localStorage.setItem(
        "focus",
        JSON.stringify({ focus: e.target.value, focusState: false })
      );
      setOpen((open) => ({ ...open, focusForm: false }));
    }
  };

  const isFocusTextPresent = localStorage.getItem("focus") !== null;

  const editHandler = () =>{
    setOpen((open) => ({ ...open, focusForm: true }));
    localStorage.removeItem("focus");
    
  }

  const deleteHandler = () => {

    setFocusText(obj => ({...obj,text:""}))
    localStorage.removeItem("focus");
    setOpen((open) => ({ ...open,  focusForm: true }));
  };
 

  return (

    <>
      <div className="weather-wrapper">
        <Weather />
      </div>
      <h1 className="font-xxl">
        {`${h}:${m}`}
        <span className="font-xxs">{session}</span>
      </h1>
      <p className="font-xl mb-lg">
        Good {greetings}, {userName}
      </p>
      {isOpen.focusForm === false || isFocusTextPresent ? (
        <>
          <p className="font-sm">Main Focus For Today</p>
          <div className="centered font-xs focus_text_wrapper">
            <input
              type="checkbox"
              name="todays-focus"
              id="todays_focus"
              checked={focusText.status}
              
              onChange={() =>
               { setFocusText((focus) => ({
                  ...focus,
                  status: !focusText.status,
                }))}
                
              }
            />
            <label htmlFor="todays_focus">
              {focusText.status ? (
                <strike>{focusText.text}</strike>
              ) : (
                <span>{focusText.text}</span>
              )}
            </label>
            <div className="icon_wrapper" onClick={editHandler}>
              <Edit />
            </div>
            <div className="icon_wrapper" onClick={() => deleteHandler()}>
              {" "}
              <Delete />
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <p className="font-lg">Whats your main focus for today ?</p>
          <input
            type="text"
            className="focus_input"
            value={focusText.text}
            onChange={(e) => setFocusText((focusText) => ({ ...focusText, text: e.target.value }))}
            onKeyPress={(e)=>focusTextHandler(e)}
            />
        </>
      )}

      <div
        className="setting_wrapper"
        onClick={() =>
          setOpen((open) => ({ ...open, settingBtn: !isOpen.settingBtn }))
        }
      >
        <SettingIcon />
      </div>
      <div className="quote-wrapper">
        <Quote />
      </div>
      {isOpen.settingBtn && (
        <button onClick={nameHandler} className="setting_btn">
          Change Name
        </button>
      )}
      <div className="todo_wrapper">
        <p
          className="font-sm todo_btn_wrapper"
          onClick={() => setOpen((isOpen) => ({ ...isOpen, todo: true }))}
          >
          Todo
        </p>
          {isOpen.todo && <TodoList setOpen={setOpen} /> }
      </div>
    </>
  );
};
