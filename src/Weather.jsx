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
  const [unit, setUnit] = useState("C")
  const [search, setSearch] = useState("");

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
  // adding cities
  const tamilNaduCities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Tirunelveli",
    "Thoothukudi",
    "Erode",
    "Vellore",
    "Tiruppur",
    "Dindigul",
    "Thanjavur",
    "Nagercoil",
    "Kanchipuram",
    "Karur",
    "Namakkal",
    "Cuddalore",
    "Villupuram",
    "Tiruvannamalai",
    "Nagapattinam",
    "Yercaud",
    "Kodaikanal"
  ];
  // function for adding cities
  const filteredCities = tamilNaduCities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  // adding unit
  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1)
  const kelvinToFahrenheit = (k) => (((k - 273.15) * 9) / 5 + 32).toFixed(1)


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
          Get real-time weather updates for your city
        </p>

        <div className="flex flex-col md:flex-row gap-5 mt-10">
          {/* Search input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search city"
            className="text-xl text-white p-4 w-64 bg-transparent border border-white rounded-md"
          />
          {/* Dropdown */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-xl text-black p-4 w-64 bg-white/80 rounded-md"
          >
            <option value="">Select a city (Tamil Nadu)</option>
            {filteredCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={getWeather}
            className="bg-black text-white p-4 w-64 rounded-md text-xl"
          >
            Get Report
          </button>
        </div>

        {temperature && !error && (
          <p className="text-red-500 text-2xl mt-8 font-bold">
            {error}
          </p>
        )}

        {!error && (
          <div className="flex flex-col md:flex-row gap-10 mt-16 p-5">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">Weather</h1>
              <h2 className="text-lg md:text-4xl italic mt-3 opacity-90">{weather}</h2>
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">Temperature</h1>
              <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight">{unit === "C" ? `${kelvinToCelsius(temperature)}°C` : `${kelvinToFahrenheit(temperature)}°F`}</h2>
              <div className="flex gap-3 justify-center mt-4">
                <button onClick={() => setUnit("C")}
                  className={`px-3 py-1 rounded ${unit === "C" ? "bg-white text-black" : "bg-black text-white"
                    }`}>°C</button>
                <button
                  onClick={() => setUnit("F")}
                  className={`px-3 py-1 rounded ${unit === "F" ? "bg-white text-black" : "bg-black text-white"
                    }`}
                >
                  °F
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">Description</h1>
              <h2 className="text-lg md:text-4xl italic opacity-80 mt-3">{description}</h2>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default Weather