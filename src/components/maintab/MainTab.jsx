import "./style.css";
import { useState, useEffect } from "react";
import { SettingIcon, Edit, Delete } from "../../assets/icons";
import { TodoList, Weather, Quote, Clock, GoalToday } from "../";
import { useTodo } from "../../context/todo-context";

export const MainTab = () => {

  const { todoDispatch } = useTodo();

  const [isOpen, setOpen] = useState({
    settingBtn: false,
    focusForm: true,
    todo: false,
  });

  //  for reset the user

  const nameHandler = () => {
    localStorage.removeItem("name");
    window.location.reload();
  };

  return (
    <>
      <div className="weather_wrapper">
        <Weather />
      </div>
      <Clock />
      <GoalToday isOpen={isOpen} setOpen={setOpen} />

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
          onClick={() =>
            setOpen((isOpen) => ({ ...isOpen, todo: !isOpen.todo }))
          }
        >
          Todo
        </p>
        {isOpen.todo && <TodoList setOpen={setOpen} />}
      </div>
    </>
  );
};
