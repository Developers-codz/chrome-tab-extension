import { useContext, createContext, useState,useRef } from "react";

const TimeContext = createContext();

const TimeProvider = ({children}) => {
  var current  = new Date()
  const [time, setTime] = useState({
    h: current.getHours(),
    m: current.getMinutes(),
    session: "AM",
    greetings: "",
  });
 

  const getTime = () => {
    const addZero = (num) => (num < 10 ? `0${num}` : num);
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let greeting;
    let s = "AM";

    if (hours === 0 && minutes === 0 && seconds === 0) {
      localStorage.removeItem("focus");
      localStorage.removeItem("todo")
    }
    if (hours >= 4 && hours < 12) greeting = "Morning";
    if (hours >= 0 && hours < 4) greeting = "Night";
    if (hours === 12) {
      s = "PM";
      greeting = "Afternoon";
    }
    if (hours > 12) {
      hours = hours - 12;
      s = "PM";
      if (hours >= 4 && hours < 8) greeting = "Evening";
      if (hours >= 0 && hours < 4) greeting = "Afternoon";
      if (hours >=8) greeting = "Night";
    }
    setTime((time) => ({
      ...time,
      h: addZero(hours),
      m: addZero(minutes),
      session: s,
      greetings: greeting,
    }));

  };
  
  return <TimeContext.Provider value={{time, setTime,getTime}}>{children}</TimeContext.Provider>;
};

const useTime = () => useContext(TimeContext);

export { useTime, TimeProvider };
