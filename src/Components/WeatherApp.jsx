import React, { useEffect, useState } from "react";
import clear_icon from "../Assets/WeatherIcons/clear.png";
import cloud_icon from "../Assets/WeatherIcons/cloud.png";
import drizzle_icon from "../Assets/WeatherIcons/drizzle.png";
import rain_icon from "../Assets/WeatherIcons/rain.png";
import snow_icon from "../Assets/WeatherIcons/snow.png";
import wind_icon from "../Assets/WeatherIcons/wind.png";
import humidity_icon from "../Assets/WeatherIcons/humidity.png";
import axios from "axios";

const WeatherApp = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState("");
  const [wicon, setWicon] = useState("clear_icon");
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api_key}`;
        // sends a GET request to specified URL and stores in response in form of json
        const response = await axios.get(url);
        console.log(response);
        //responseData holds the response data returned by the server
        const responseData = await response.data;
        // console.log(responseData);
        // holds the icon data
        const iconCode = responseData.weather[0].icon;
        // console.log(iconCode);
        switch (iconCode) {
          case "01d":
          case "01n":
            setWicon(clear_icon);
            break;
          case "02d":
          case "02n":
            setWicon(cloud_icon);
            break;
          case "03d":
          case "03n":
            setWicon(drizzle_icon);
            break;
          case "04d":
          case "04n":
            setWicon(cloud_icon);
            break;
          case "09d":
          case "09n":
            setWicon(rain_icon);
            break;
          case "10d":
          case "10n":
            setWicon(rain_icon);
            break;
          case "11d":
          case "11n":
            setWicon(snow_icon);
            break;
          case "13d":
          case "13n":
            setWicon(snow_icon);
            break;
          default:
            console.log("No icon has been found");
        }
        // set the retrieved data
        setWeatherData(responseData);
      } catch (error) {
        console.log("Error fetching data from API");
      }
    };
    // fetch data whenever search changes
    fetchApi();
  }, [search]);

  return (
    <div
      className="container m-auto mt-20 w-96  rounded-lg shadow-lg p-6 bg-blue-400"
      style={{ height: "650px" }}
    >
      <div className="flex justify-center pt-15">
        <input
          type="text"
          className="flex w-64 h-8 mt-5 border-none px-3 text-xs rounded-full"
          placeholder="Search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {weatherData && weatherData.main ? (
        <>
          <div className="flex mt-7 justify-center">
            <img src={wicon} alt="" />
          </div>
          <div className="text-7xl font-semibold text-cyan-50 mt-4">
            {Math.floor(weatherData.main.temp)}°C
          </div>
          <div className="text-3xl font-semibold text-cyan-50 mt-4">
            {weatherData.name}
          </div>
          <div className="flex flex-row justify-center mt-10 gap-x-24">
            <div className="flex flex-col items-center">
              <img className="" src={humidity_icon} alt="" />
              <div className="mt-2 text-cyan-50">
                {weatherData.main.humidity}%
              </div>
              <div className="text-cyan-50">Humidity</div>
            </div>
            <div className="flex flex-col items-center">
              <img src={wind_icon} alt="" />
              <div className="mt-2 text-cyan-50">
                {weatherData.wind.speed} km/h
              </div>
              <div className="text-cyan-50">Wind Speed</div>
            </div>
          </div>
        </>
      ) : search !== "" ? (
        <p className="text-red-700">No data has been found</p>
      ) : (
        <div className="text-white mt-20 text-3xl font-bold  flex justify-center items-center ">
          Welcome to Weather App
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
