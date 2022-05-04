import { useTodo } from "../../context/todo-context";
import "./todo.css";
const Todo = ({ item }) => {
  const { todoDispatch} = useTodo();
  return (
    <li className="decor-none font-xs padding-sm todo-lists">
      <div>
        <input
          type="checkbox"
          name="todo"
          checked={item.completed}
          id={item.todo}
          
        />
        <label htmlFor={item.todo}>{item.completed ? <strike onClick={() =>
            todoDispatch({ type: "TOGGLE_STATUS_FALSE", payload: item.id})
          }>{item.todo}</strike>:<span onClick={() =>
            todoDispatch({ type: "TOGGLE_STATUS_TRUE", payload: item.id})
          }>{item.todo}</span>}</label>
      </div>
      <span
        className="remove-btn reset"
        onClick={() => todoDispatch({ type: "REMOVE_TODO", payload: item.id })}
      >
        x
      </span>
    </li>
  );
};
export default Todo;
