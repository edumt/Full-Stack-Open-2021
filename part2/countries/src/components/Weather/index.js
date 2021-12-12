import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      )
      .then((response) => setWeather(response.data));
  }, [city]);

  if (weather) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>
          <b>temperature:</b> {Math.round(weather.main.temp)} Celsius
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
          height="100px"
        />
        <p>
          <b>wind:</b> {Math.round(weather.wind.speed)} km/h direction{" "}
          {weather.wind.deg} degrees
        </p>
      </div>
    );
  } else return null;
};

export default Weather;
