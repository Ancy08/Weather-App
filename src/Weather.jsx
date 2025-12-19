import axios from "axios"
import { useState } from "react"
import weatherImg from "./sunny.avif"
import sunnyImg from "./sunny.avif"
import rainImg from "./jason-leung-neu_ObiyyMg-unsplash.jpg"
import mistImg from "./mist.avif"
import cloudsImg from "./cludy.avif"
import hazeImg from "./haze.jpg"
import snowImg from "./snow.avif"
import stormImg from "./storm.jpg"



function Weather() {
    const [city, setCity] = useState("")
    const [weather, setweather] = useState("")
    const [temperature, settemperature] = useState("")
    const [description, setdescription] = useState()
    const [error, seterror] = useState("")

    const getBackgroundImage = () => {
        const w = weather.toLowerCase();

        if (w === "clear") return sunnyImg;
        if (w === "rain") return rainImg;
        if (w === "clouds") return cloudsImg;
        if (w === "mist") return mistImg;
        if (w === "haze") return hazeImg;
        if (w === "snow") return snowImg;
        if (w === "thunderstorm") return stormImg;
        return weatherImg; // default background
    };

    function handleCity(event) {
        setCity(event.target.value)
    }
    function getWeather() {
        seterror("")
        var weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5abc78bb4d13126b106cd46b513dadaa`)
        weatherdata.then(function (success) {
            console.log(success.data)
            setweather(success.data.weather[0].main)
            settemperature(success.data.main.temp)
            setdescription(success.data.weather[0].description)
        })
            .catch(function (err) {
                seterror("City Not Found Please Try Again")
                setweather("")
                settemperature("")
                setdescription("")
            })
    }
    return (

 <div
    className="relative w-full min-h-screen bg-cover bg-center text-white"
    style={{
      backgroundImage: `url(${getBackgroundImage()})`,
      transition: "background-image 0.5s ease-in-out"
    }}
  >
    
    <div className="absolute inset-0 bg-black/40"></div>

    
    <div className="relative z-10 px-4 md:px-10 flex flex-col items-center text-center">
      
      <h1 className="text-4xl md:text-7xl font-medium mt-10 leading-tight">
        Weather Report
      </h1>

      <p className="text-xl md:text-5xl mt-6">
        I can give you a weather report of your city!
      </p>

      <div className="flex flex-col md:flex-row gap-5 mt-10">
        <input
          onChange={handleCity}
          type="text"
          placeholder="Enter your City name"
          className="text-xl text-white p-4 w-64 bg-transparent border border-white rounded-md"
        />
        <button
          onClick={getWeather}
          className="bg-black text-white p-4 w-64 rounded-md text-xl"
        >
          Get Report
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-2xl mt-8 font-bold">
          {error}
        </p>
      )}

      {!error && (
        <div className="flex flex-col md:flex-row gap-10 mt-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">Weather</h1>
            <h2 className="text-2xl md:text-4xl">{weather}</h2>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">Temperature</h1>
            <h2 className="text-2xl md:text-4xl">{temperature}</h2>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">Description</h1>
            <h2 className="text-2xl md:text-4xl">{description}</h2>
          </div>
        </div>
      )}
    </div>
  </div>

    )
}
        
export default Weather