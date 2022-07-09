import { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";
export const Weather = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
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


  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(lat,long)
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b8f865aec3438529607574e15033f34b`
        );
        (typeof data.main != 'undefined')  &&
        setTemp((temp) => ({
          ...temp,
          currTemp: data.main.temp,
          icon: data.weather[0].icon,
          desc: data.weather[0].description,
          feels: data.main.feels_like,
          pressure: data.main.pressure,
          city: data.name,
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log("I ran")
  }, [lat, long]);




  return (
    <>
      {isLoading ? (
        <div>Loading .....</div>
      ) : (
        <div className="centered">
          <img src={`http://openweathermap.org/img/w/${temp.icon}.png`} />
          <div onClick={() => setOpen(!weatherDetailOpen)}>
            <div>{Math.round(temp.currTemp) - 273 + "°"}</div>
            <div>{temp.city}</div>
          </div>
          {weatherDetailOpen ? (
            <div className="weather-detail-wrapper">
              <div className="city ">
                <div className="font-xs">{temp.city}</div>
                <div className="font-xxs">{temp.desc}</div>
              </div>
              <div className="font-lg temp-centered">
                <div className="font-lg">
                  {Math.round(temp.currTemp) - 273 + "°"}
                </div>
                <div className="centered font-xxs">
                  <div>Feels Like {Math.round(temp.feels) - 273 + "°"}</div>
                </div>
              </div>
              <div className="bottom-left-wrapper">
                <div>Pressure: {temp.pressure}</div>
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
