import { CloseIcon } from "../../assets/icons";
import { useTodo } from "../../context/todo-context";
import "./todo.css";
const Todo = ({ item }) => {
  const { todoDispatch } = useTodo();
  return (
    <li className="decor-none font-xs padding-sm todo-lists">
      <div>
        <input
          type="checkbox"
          name="todo"
          checked={item.completed}
          id={item.todo}
          onChange={() =>
            item.completed
              ? todoDispatch({ type: "TOGGLE_STATUS_FALSE", payload: item.id })
              : todoDispatch({ type: "TOGGLE_STATUS_TRUE", payload: item.id })
          }
        />
        <label htmlFor={item.todo}>
          {item.completed ? (
            <strike>{item.todo}</strike>
          ) : (
            <span>{item.todo}</span>
          )}
        </label>
      </div>
      <span
        className="remove-btn reset"
        onClick={() => todoDispatch({ type: "REMOVE_TODO", payload: item.id })}
      >
        <CloseIcon />
      </span>
    </li>
  );
};
export default Todo;
