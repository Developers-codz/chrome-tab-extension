import "./style.css";
import { SettingIcon, Edit, Delete } from "../../assets/icons";

import { useState, useEffect } from "react";

export const MainTab = () => {
  const userName = localStorage.getItem("name");
  const [isOpen, setOpen] = useState({ settingBtn: false, focusForm: true });
  const [focusText, setFocusText] = useState("");
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, session: "AM" });

  //  for time display

  const getTime = () => {
    const addZero = (num) => (num < 10 ? `0${num}` : num);
    let today = new Date();
    let hours = addZero(today.getHours());
    let minutes = addZero(today.getMinutes());
    let seconds = addZero(today.getSeconds());
    let s = "AM";
    if (hours > 12) {
      hours = hours - 12;
      s = "PM";
    }
    setTime((time) => ({
      ...time,
      h: hours,
      m: minutes,
      s: seconds,
      session: s,
    }));
  };
  setInterval(getTime, 1000);
  const clickHandler = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("focus");
    window.location.reload();
  };

  const focusTextHandler = (e) => {
    setFocusText(e.target.value);
    if (e.keyCode === 13) {
      localStorage.setItem("focus", JSON.stringify({ focus: e.target.value }));
      setOpen((open) => ({ ...open, focusForm: false }));
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("focus")) !== null) {
      const { focus } = JSON.parse(localStorage.getItem("focus"));
      setFocusText(focus);
    }
  }, []);

  const isFocusTextPresent = localStorage.getItem("focus") !== null;
  const { h, m, session } = time;
  return (
    <>
      <h1 className="font-xxl">{`${h}:${m} ${session}`}</h1>
      <p className="font-lg">Good Evening, {userName}</p>
      {isOpen.focusForm === false || isFocusTextPresent ? (
        <>
          <p className="font-lg">Main Focus For Today</p>
          <div className="centered font-xs focus_text_wrapper">
            <input type="checkbox" name="todays-focus" id="todays_focus" />
            <label htmlFor="todays_focus">{focusText}</label>
            <Edit />
            <Delete />
          </div>
        </>
      ) : (
        <>
          {" "}
          <p className="font-lg">Whats your main focus for today ?</p>
          <input
            type="text"
            className="focus_input"
            onKeyUp={(e) => focusTextHandler(e)}
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
      {isOpen.settingBtn && (
        <button onClick={clickHandler} className="setting_btn">
          Change Name
        </button>
      )}
      <div className="todo_wrapper">
        <p className="font-sm">Todo</p>
      </div>
    </>
  );
};
