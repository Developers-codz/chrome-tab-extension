import { useTodo } from "../../context/todo-context";
import "./todo.css";
const Todo = ({ item }) => {
  console.log(item)
  const { todoDispatch } = useTodo();
  return (
    <li className="decor-none font-xxs padding-sm todo-lists">
      <div>
        <input type="checkbox" name="todo" id={item.todo} />
        <label htmlFor={item.todo}>{item.todo}</label>
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
