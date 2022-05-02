import "./todo.css";
import { useState, useEffect } from "react";
import { Downarrow } from "../../assets/icons";
import { useTodo } from "../../context/todo-context";
import Todo from "./Todo";


export const TodoList = ({ setOpen }) => {
  const [todoAddOpen, setTodoOpen] = useState(false);
  const { todoDispatch, todoState } = useTodo();
  const [todo,setTodo] = useState("")

  
  // const inputHandler = () => {
  //   // if (e.keyCode === 13) {
  //     console.log("triggred")
  //     todoDispatch({ type: "SET_TODO_ITEM", payload: todo });
  //     // e.target.value = "";
  //     // localStorage.setItem("todo", JSON.stringify(todoState));
  //   // }
  // };

  // useEffect(() => {
  //   localStorage.setItem("todo", JSON.stringify(todoState));
  // }, [todoState]);
  return (
    <>
      <div className="todo-container">
        {todoAddOpen
        //  || todoState.length > 0
          ? (
          <>
            <div className="todo-task-wrapper">
              <ul>
                {/* {todoState.map((item,i) => (
                  <Todo item={item}  key={i}/>
                ))} */}
                {console.log(todoState)}
              </ul>
            </div>
            <div className="todo-input-wrapper">
              <input
                className="todo_input"
                placeholder="Add to do now"
                onChange={(e)=>setTodo(e.target.value)}
              />
              <button onClick={()=>todoDispatch({ type: "SET_TODO_ITEM", payload: todo })}>Add</button>
            </div>
          </>
        ) : (
          <div className="centered vertical-direction ">
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
