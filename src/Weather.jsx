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

        <div className="text-white min-h-screen w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${getBackgroundImage()})`, transition: "background-image 0.5s ease-in-out", filter: "brightness(0.85)" }}>
            <div className="absolute inset-0 z-10 bg-black/40 min-h-screen">
                <div className=" p-10 text-center relative z-20">
                    <h1 className="text-4xl md:text-7xl text-center font-medium relative top-2">Weather Report</h1>
                    <p className="text-2xl md:text-5xl relative top-7">I can give you a weather report of your city !</p>
                    <div className="flex items-center justify-center relative gap-5 top-11">
                        <input onChange={handleCity} type="text" placeholder="Enter your City name" className="mt-10 text-xl text-white p-4 w-60 border bg-transparent border-black  rounded-md font-bold"></input><br />
                        <button onClick={getWeather} className="bg-black w-60 text-white p-4 mt-10 border border-black rounded-md text-xl">Get Report</button>
                    </div>
                    {error && 
                        (<p className="text-red-700 z-30  text-2xl mt-11 relative font-bold">{error}</p>)}
                        {!error && (
                             <div className="relative flex flex-col  md:flex-row mt-20 gap-10 justify-between">

                                <div className="text-white p-8  rounded-lg">
                                    <h1><b className=" text-bold text-5xl md:text-7xl">Weather</b></h1>
                                    <h2 className="text-2xl font-bold md:text-4xl">{weather}</h2>
                                </div>
                                <div className="text-white gap-10 p-8 rounded-lg">
                                    <h1><b className=" text-bold text-5xl md:text-7xl">Temperature</b></h1>
                                    <h2 className="text-2xl font-bold md:text-4xl">{temperature} </h2>
                                </div>
                                <div className="text-white  p-8 rounded-lg">
                                    <h1><b className=" text-bold text-5xl md:text-7xl">Description</b></h1>
                                    <h2 className="text-2xl font-bold md:text-4xl">{description}</h2>
                                </div>


                            </div>
                        )}

 
                </div>
            </div>
        </div>


    )
}
        
export default Weather