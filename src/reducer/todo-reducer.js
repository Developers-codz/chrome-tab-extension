import { v4 as uuid } from "uuid";

export const initState =[];


export const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO_ITEM": {
      return [...state,{id: uuid(), todo: action.payload, completed: false }]
    }
    case "SET_TODO":{
      return action.payload
    }
    case "REMOVE_TODO" : {
      return state.filter((todo)=> todo.id !== action.payload)
    }
    case "TOGGLE_STATUS_FALSE": {
      const task =  state.find((todo) => todo.id === action.payload)
      task.completed = false
         return [...state]
    }
    case "TOGGLE_STATUS_TRUE": {
      const task =  state.find((todo) => todo.id === action.payload)
      task.completed = true
         return [...state]
    }
  }
};
