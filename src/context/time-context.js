import { useContext, createContext, useState } from "react";

const TimeContext = createContext();

const TimeProvider = ({children}) => {
    
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
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
    }
    if (hours === 0) hours = "12";
    if (hours > 0 || hours < 4) greeting = "Night";
    if (hours > 4 || hours < 12) greeting = "Morning";
    if (hours === 12) {
      s = "PM";
      greeting = "Afternoon";
    }
    if (hours > 12) {
      hours = hours - 12;
      s = "PM";
      if (hours > 1 || hours < 4) greeting = "Afternoon";
      if (hours > 4 || hours < 8) greeting = "Evening";
      if (hours >=8) greeting = "Night";
    }
    setTime((time) => ({
      ...time,
      h: addZero(hours),
      m: addZero(minutes),
      s: addZero(seconds),
      session: s,
      greetings: greeting,
    }));
  };
  setInterval(getTime, 1000);
  return <TimeContext.Provider value={{time, setTime}}>{children}</TimeContext.Provider>;
};

const useTime = () => useContext(TimeContext);

export { useTime, TimeProvider };
