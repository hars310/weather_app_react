import React, { useState } from "react";

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherIcon = (weatherCode) => {
    console.log(weatherCode)
    if (weatherCode === '01d') {
      return clear_icon;
    } else if (['02d', '02n', '03d', '03n'].includes(weatherCode)) {
      return cloud_icon;
    } else if (['04d', '04n'].includes(weatherCode)) {
      return drizzle_icon;
    } else if (['09d', '09n', '10d', '10n'].includes(weatherCode)) {
      return rain_icon;
    } else if (['13d', '13n'].includes(weatherCode)) {
      return snow_icon;
    } else if (['50d', '50n'].includes(weatherCode)) {
      return wind_icon;
    } else {
      return "";  // Assuming an empty string as the default icon
    }
  };

  const url = "https://api.openweathermap.org/data/2.5/weather"; // Corrected endpoint
  const apiKey = process.env.REACT_APP_APIKEY; // Move this to an environment variable

  const search = async () => {
    try {
      const response = await fetch(
        `${url}?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const result = await response.json();
      console.log(result)
      if (result.cod === "404") {
        document.querySelector('.cityNotFound').innerHTML = "City Not Found"
        setWeatherData(null);
      } else {
        setWeatherData(result);
        document.querySelector('.cityNotFound').innerHTML = ""

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container  w-96 h-auto m-auto mt-20 p-8 pt-4 flex items-center justify-center text-center flex-col rounded-[14px] bg-zinc-700 drop-shadow-md">
      <h1 className="text-white text-4xl mb-4 font-bold ">Weather App</h1>
      <div className="topbar flex items-center h-10 px-4 py-6">
        <input
          type="text"
          className="cityInput p-2 px-4 mr-4 rounded-full outline-none"
          placeholder="Search"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <div
          className="search-icon flex justify-center items-center w-10 h-10 rounded-full bg-white cursor-pointer"
          onClick={search}
        >
          <img src={search_icon} alt="" />
        </div>

      </div>
      <div className="cityNotFound text-red-700 font-bold">

      </div>
      {weatherData && (
      <div className="other flex flex-col items-center">
          <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="Weather Icon" className="weather-icon" />
        <div className="weather-temp flex justify-center text-white text-xl font-normal">
          {(weatherData.main.temp)}°C
        </div>
        <div className="weather-location text-white text-4xl mb-4">{weatherData.name}</div>
        <div className="data-container gap-16 w-full flex items-end justify-between mt-8">
          {/* You can continue to display other weather data as needed */}
          <div className="element flex align-items-start gap-2 m-auto">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data text-white flex flex-col">
              <div className="humidity-percent">{weatherData.main.humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element flex align-items-start gap-2 m-auto">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data text-white flex flex-col">
              <div className="wind-speed">{weatherData.wind.speed}km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
         
        </div>
      </div>
    )}

    </div>
  );
};

export default WeatherApp;
