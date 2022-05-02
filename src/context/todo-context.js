import { useContext, createContext, useReducer } from "react";
import { initState, todoReducer } from "../reducer/todo-reducer";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {

  const [todoState, todoDispatch] = useReducer(todoReducer,initState);
  return (
    <TodoContext.Provider value={{ todoState, todoDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => useContext(TodoContext);

export { useTodo, TodoProvider };
