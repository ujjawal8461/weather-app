import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaTint } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import cloudImg from "../public/images/cloudy.jpg";
import sunnyImg from "../public/images/sunny.jpg";
import snowyImg from "../public/images/snowy.jpg";
import windyImg from "../public/images/windy.jpg";
import rainyImg from "../public/images/rainy.jpg";

function App() {
  const [temp, settemp] = useState(0.0);
  const [hum, sethum] = useState(0);
  const [weather, setweather] = useState("None");
  const [wind, setwind] = useState(0.0);
  const [img, setimg] = useState(cloudImg);
  const [city, setcity] = useState("");
  const [city2, setcity2] = useState("City Name");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const getdata = async () => {
    const apiKey = "f505645fbfb08bacfc4f67c72b766740";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      settemp(data.main.temp);
      sethum(data.main.humidity);
      setwind(data.wind.speed);
      setweather(data.weather[0].main);
      setcity2(data.name);
    } catch (error) {
      console.log("Not FOund");
    }
  };
  useEffect(() => {
    getdata();
    if (weather == "Clear") {
      setimg(sunnyImg);
    } else if (weather == "Snow") {
      setimg(snowyImg);
    } else if (weather === "Rain" || weather === "Drizzle") {
      setimg(rainyImg);
    } else if (weather == "Clouds") {
      setimg(cloudImg);
    } else {
      setimg(windyImg);
    }
  }, [city, weather]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-96 rounded text-white shadow-lg bg-cover bg-center relative  "
          style={{ backgroundImage: `url(${img})` }}
        >
          <h1 className="text-4xl font-bold text-center m-2 mt-6">
            Weather App
          </h1>

          <div className="flex items-center justify-center m-2">
            <form
              onSubmit={submitHandler}
              className="flex flex-row items-center"
            >
              <input
                type="text"
                className="appearance-none bg-gray-200 border border-gray-200 rounded w-9/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Enter text..."
                value={city}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
              />
              <button
                className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getdata}
              >
                <IoSearchSharp className="text-xl" />
              </button>
            </form>
          </div>

          <div
            className="flex flex-col items-center justify-center m-2 bg-white bg-opacity-5 backdrop-blur-lg shadow-lg rounded-lg p-6 "
            style={{ marginTop: "280px" }}
          >
            <h1 className="text-7xl font-bold m-1 ">{temp}&deg;C</h1>

            <h1 className="text-4xl font-semibold m-1 ">{city2}</h1>

            <div className="flex">
              <div className="flex items-center font-medium  mr-4">
                <FaTint />
                <h1 className="text-2xl m-1">{hum}% </h1>
              </div>

              <div className="flex items-center font-medium  ml-4">
                <FaWind />
                <h1 className="text-2xl m-1 ">{wind}km/h </h1>
              </div>
            </div>

            <h1 className="text-2xl font-semibold m-1 ">Weather: {weather} </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
