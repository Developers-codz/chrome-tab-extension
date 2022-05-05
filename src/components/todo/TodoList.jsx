import "./todo.css";
import { useState, useEffect } from "react";
import { Downarrow } from "../../assets/icons";
import { useTodo } from "../../context/todo-context";
import Todo from "./Todo";


export const TodoList = ({ setOpen }) => {
  const [todoAddOpen, setTodoOpen] = useState(false);
  const { todoDispatch, todoState } = useTodo();

  
  const inputHandler = (e) => {
    if (e.keyCode === 13) {
      console.log("triggred")
      todoDispatch({ type: "SET_TODO_ITEM", payload: e.target.value });
      e.target.value = "";
      localStorage.setItem("todo", JSON.stringify(todoState));
    }
  };
  useEffect(() => {
    let todo = JSON.parse(localStorage.getItem("todo"));
    if (todo !== null) todoDispatch({ type: "SET_TODO", payload: todo });
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoState));
  }, [todoState]);
  
  return (
    <>
      <div className="todo-container">
        {todoAddOpen
         || todoState.length > 0
          ? (
          <>
          <h2 className="todo-head">Today</h2>
            <div className="todo-task-wrapper">
              <ul>
                {todoState.map((item,i) => (
                  <Todo item={item}  key={i}/>
                ))}
              </ul>
            </div>
            <div className="todo-input-wrapper">
              <input
                className="todo_input"
                placeholder="Add to do now"
                onKeyUp={(e)=>inputHandler(e)}
              />
              
            </div>
          </>
        ) : (
          <div className="centered vertical-direction template-wrapper">
            <p className="font-sm mb-lg">No todo yet? </p>
            <button className="continue_btn" onClick={() => setTodoOpen((flag)=>!flag)}>
              Add now {">"}
            </button>
          </div>
        )}
        <div
          className="close-btn-wrapper"
          onClick={() => setOpen((open) => ({ ...open, todo: false }))}
        >
          <Downarrow />
        </div>
      </div>
    </>
  );
};
