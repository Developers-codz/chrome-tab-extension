import { v4 as uuid } from "uuid";

export const initState =[];
// var abc = initState[initState.length-1].id || initState[initState.length-1]
// console.log(abc)

export const todoReducer = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case "SET_TODO_ITEM": {
      console.log("")
      return [...state,{id: uuid(), todo: action.payload, completed: false }]
    }
    // case "SET_TODO":{
    //   return action.payload
    // }
    // case "REMOVE_TODO" : {
    //   return state.filter((id)=> id === action.payload)
    // }
  }
};
