import { useState, useEffect } from "react";
import { Edit, Delete } from "../../assets/icons";

export const GoalToday = ({ isOpen, setOpen }) => {
  const [focusText, setFocusText] = useState({ text: "", status: false });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("focus")) !== null) {
      const { focus, focusState } = JSON.parse(localStorage.getItem("focus"));
      setFocusText((focusText) => ({
        ...focusText,
        text: focus,
        status: focusState,
      }));
    }
  }, []);
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("focus") !== null)){

      localStorage.setItem(
        "focus",
        JSON.stringify({ ...JSON.parse(localStorage.getItem("focus")), focusState: focusText.status })
      );
    }
  }, [focusText.status]);

  const focusTextHandler = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem(
        "focus",
        JSON.stringify({ focus: e.target.value, focusState: false })
      );
      setOpen((open) => ({ ...open, focusForm: false }));
    }
  };
  const isFocusTextPresent = localStorage.getItem("focus") !== null;

  const editHandler = () => {
    setOpen((open) => ({ ...open, focusForm: true }));
    localStorage.removeItem("focus");
  };

  const deleteHandler = () => {
    setFocusText((obj) => ({ ...obj, text: "",status:false }));
    localStorage.removeItem("focus");
    setOpen((open) => ({ ...open, focusForm: true }));
  };

  return (
    <>
      {isOpen.focusForm === false || isFocusTextPresent ? (
        <>
          <p className="font-sm">Main Focus For Today</p>
          <div className="centered font-xs focus_text_wrapper">
            <input
              type="checkbox"
              name="todays-focus"
              id="todays_focus"
              checked={focusText.status}
              onChange={() => {
                setFocusText((focus) => ({
                  ...focus,
                  status: !focusText.status,
                }));
              }}
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
            <div className="icon_wrapper" onClick={deleteHandler}>
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
            onChange={(e) =>
              setFocusText((focusText) => ({
                ...focusText,
                text: e.target.value,
              }))
            }
            onKeyPress={(e) => focusTextHandler(e)}
          />
        </>
      )}
    </>
  );
};
