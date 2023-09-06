import React, { useEffect, useState } from "react";
import clear_icon from "../clear.png";
import cloud_icon from "../cloud.png";
import drizzle_icon from "../drizzle.png";
import rain_icon from "../rain.png";
import snow_icon from "../snow.png";
import wind_icon from "../wind.png";
import humidity_icon from "../humidity.png";
import axios from "axios";

const WeatherApp = () => {
  const api_key = "0f0a0134bb28d6effaff6babe75f8172";
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

        if (iconCode === "01d" || iconCode === "01n") {
          setWicon(clear_icon);
        } else if (iconCode === "02d" || iconCode === "02n") {
          setWicon(cloud_icon);
        } else if (iconCode === "03d" || iconCode === "03n") {
          setWicon(drizzle_icon);
        } else if (iconCode === "04d" || iconCode === "04n") {
          setWicon(cloud_icon);
        } else if (iconCode === "09d" || iconCode === "09n") {
          setWicon(rain_icon);
        } else if (iconCode === "10d" || iconCode === "10n") {
          setWicon(rain_icon);
        } else if (iconCode === "11d" || iconCode === "11n") {
          setWicon(rain_icon);
        } else if (iconCode === "13d" || iconCode === "13n") {
          setWicon(snow_icon);
        } else {
          setWicon(wind_icon);
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
