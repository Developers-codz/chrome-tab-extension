import { useEffect, useState } from "react";
import "./weather.css";
export const Weather = () => {
  const [location, setLoaction] = useState({ longitude: 0, latitude: 0 });
  const [temp, setTemp] = useState({
    currTemp: null,
    city: null,
    desc: null,
    icon: null,
    feels: null,
    pressure: null,
  });
  const [weatherDetailOpen, setOpen] = useState(false);
  // useEffect(() => {
  //   function getLocation() {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.watchPosition(setPosition);
  //     } else {
  //       console.log("Geolocation is not supported by this browser.");
  //     }
  //   }

  //   function setPosition(position) {
  //     setLoaction((loc) => ({
  //       ...loc,
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     }));
  //   }
  //   getLocation();

  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=b8f865aec3438529607574e15033f34b`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTemp((temp) => ({
  //         ...temp,
  //         currTemp: data.main.temp,
  //         icon: data.weather[0].icon,
  //         desc: data.weather[0].description,
  //         feels: data.main.feels_like,
  //         pressure: data.main.pressure,
  //         city: data.name,
  //       }));
  //     })
  //     .catch((err) => console.log(err));
  // }, [location]);

  return (
    <>
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
    </>
  );
};
