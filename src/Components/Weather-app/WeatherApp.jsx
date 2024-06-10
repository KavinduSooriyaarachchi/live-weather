// import React from "react";
// import "./WeatherApp.css";

// import search_icon from "../Assets/search.png";
// import clear_icon from "../Assets/clear.png";
// import cloud_icon from "../Assets/cloud.png";
// import drizzle_icon from "../Assets/drizzle.png";
// import rain_icon from "../Assets/rain.png";
// import snow_icon from "../Assets/snow.png";
// import wind_icon from "../Assets/wind.png";
// import humidity_icon from "../Assets/humidity.png";

// const WeatherApp = () => {
//   let api_key = "1da98bd96c91299ac92af769ac8122f0";

//   const search = async () => {
//     const element = document.getElementsByClassName("cityInput");
//     if (element[0].value === "") {
//       return 0;
//     }
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

//     let response = await fetch(url);
//     let data = await response.json();

//     const humidity = document.getElementsByClassName("humidity-percent");
//     const wind = document.getElementsByClassName("wind-rate");
//     const temprature = document.getElementsByClassName("weather-temp");
//     const location = document.getElementsByClassName("weather-location");

//     humidity[0].innerHTML = data.main.humidity;
//     wind[0].innerHTML = data.wind.speed;
//     temprature[0].innerHTML = data.main.temp;
//     location[0].innerHTML = data.name;
//   };

//   return (
//     <div className="container">
//       <div className="top-bar">
//         <input type="text" className="cityInput" placeholder="search" />
//         <div
//           className="search-icon"
//           onClick={() => {
//             search();
//           }}
//         >
//           <img src={search_icon} alt="" />
//         </div>
//       </div>

//       <div className="weather-image">
//         <img src={cloud_icon} alt="" />
//       </div>
//       <div className="weather-temp">28°C</div>
//       <div className="weather-location">London</div>
//       <div className="data-container">
//         <div className="element">
//           <img src={humidity_icon} alt="" className="icon" />
//           <div className="data">
//             <div className="humidity-percent">64%</div>
//             <div className="text">Humidity</div>
//           </div>
//         </div>
//         <div className="element">
//           <img src={wind_icon} alt="" className="icon" />
//           <div className="data">
//             <div className="humidity-percent">18 km/h</div>
//             <div className="text">Wind Speed</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherApp;

import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const api_key = "1da98bd96c91299ac92af769ac8122f0";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: "28°C",
    location: "London",
    humidity: "64%",
    windSpeed: "18 km/h",
    weatherIcon: cloud_icon,
  });

  const search = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      setWeatherData({
        temperature: `${data.main.temp}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
        weatherIcon: getWeatherIcon(data.weather[0].main),
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return clear_icon;
      case "clouds":
        return cloud_icon;
      case "drizzle":
        return drizzle_icon;
      case "rain":
        return rain_icon;
      case "snow":
        return snow_icon;
      default:
        return cloud_icon;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && search()}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      <div className="weather-image">
        <img src={weatherData.weatherIcon} alt="Weather Icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
