import { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";

export const Weather = () => {
  const [latlong, setLatLong] = useState({lat:null,long:null});
  
  const [temp, setTemp] = useState({
    currTemp: null,
    city: null,
    desc: null,
    icon: null,
    feels: null,
    pressure: null,
  });
  const [weatherDetailOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatLong(prev => ({...prev,lat:position.coords.latitude,long:position.coords.longitude}));
      
    });
   
  },[])


  
  useEffect( async () => {
    
      try {
        setLoading(true);
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlong?.lat}&lon=${latlong?.long}&appid=49f0aaf487db4c85dece9408c455c941`
        );
        setTemp((temp) => ({
          ...temp,
          currTemp: data.data.main.temp,
          icon: data.data.weather[0].icon,
          desc: data.data.weather[0].description,
          feels: data.data.main.feels_like,
          pressure: data.data.main.pressure,
          city: data.data.name,
        }));
      } catch(err) {
       console.log(err)
      } finally {
        setLoading(false)
    };
  }, [latlong]);




  return (
    <>
      {isLoading ? (
        <div>Loading .....</div>
      ) : (
        <div className="centered">
          <div className="centered" onClick={() => setOpen(!weatherDetailOpen)}>
          <img src={`http://openweathermap.org/img/w/${temp.icon}.png`} />
          <div>
            <div>{Math.round(temp?.currTemp) - 273 + "°" }C</div>
            <div>{temp?.city}</div>
          </div>
          </div>
          {weatherDetailOpen ? (
            <div className="weather-detail-wrapper">
              <div className="city ">
                <div className="font-xs">{temp?.city}</div>
                <div className="font-xxs">{temp?.desc}</div>
              </div>
              <div className="font-lg temp-centered">
                <div className="font-lg">
                  {Math.round(temp?.currTemp) - 273 + "°"} C
                </div>
                <div className="centered font-xxs">
                  <div>Feels Like {Math.round(temp?.feels) - 273 + "°"}</div>
                </div>
              </div>
              <div className="bottom-left-wrapper">
                <div>Pressure: {temp?.pressure}</div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
