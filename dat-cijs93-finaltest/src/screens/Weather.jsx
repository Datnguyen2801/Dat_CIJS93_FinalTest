import React, { useEffect, useState } from "react";
import "../Weather.css";
import axios from "axios";
import photo1 from "../img/search.png";
import photo2 from "../img/humidity.png";
import photo3 from "../img/wind.png";

const Weather = () => {
  //
  // Search hơi lâu ra dữ liệu, vui lòng kiên nhẫn và bấm lại nhiều lần !.! >.<
  //

  const [data, setData] = useState({
    celcius: 290,
    name: "Ho Chi Minh",
    humidity: 46,
    speed: 4.51,
    image: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=6ae8ccf58c5d68faf3beb027f15ad343`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main == "Clear") {
            imagePath =
              "https://cdn-icons-png.flaticon.com/512/6974/6974833.png";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath =
              "https://cdn-icons-png.flaticon.com/512/3351/3351979.png";
          } else if (res.data.weather[0].main == "Snow") {
            imagePath = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
          } else if (res.data.weather[0].main == "Clouds") {
            imagePath = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
          } else if (res.data.weather[0].main == "Haze") {
            imagePath = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
          } else if (res.data.weather[0].main == "Smoke") {
            imagePath =
              "https://cdn-icons-png.flaticon.com/512/4380/4380458.png";
          } else if (res.data.weather[0].main == "Mist") {
            imagePath =
              "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath =
              "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter Your Location"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src={photo1} alt="" onClick={handleClick} />
          </button>
        </div>

        <div className="error">
          <p>{error}</p>
        </div>

        <div className="winfo">
          <h2>{data.name}</h2>
          <img src={data.image} alt="" className="icon" />

          <div className="winfo-1">
            <h1>{Math.round(data.celcius) / 10}°c</h1>
          </div>

          <div className="details">

            <div className="col">
              <img src={photo2} alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src={photo3} alt="" />
              <div className="wind">
                <p>{data.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
