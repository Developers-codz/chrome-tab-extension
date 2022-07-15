
import { useTime } from "../../context/time-context";
export const Clock = () =>{
  
  const userName = localStorage.getItem("name");
    const { time:{h, m, session, greetings },getTime} = useTime();
    setTimeout(getTime,1000)
    setInterval(getTime, 1000*60);
    return (
        <>
        <h1 className="font-xxl">
       {`${h}:${m}`}
       <span className="font-xxs">{session}</span>
     </h1>
     <p className="font-xl mb-lg">
       Good {greetings}, {userName}
     </p>
        </>
    )
}