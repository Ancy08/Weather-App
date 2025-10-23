import axios from "axios"
import { useState } from "react"


function Weather() {
    const [city, setCity] = useState("")
    const [weather, setweather] = useState("")
    const [temperature, settemperature] = useState("")
    const [description, setdescription] = useState()
    const [error, seterror] = useState("")

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
    return (<div className="bg-yellow-200 border border-black rounded-2xl m-5 p-10">
        <div className="bg-blue-200 p-10 border border-black shadow-xl rounded-lg">
            <h1 className="text-2xl font-medium">Weather Report</h1>
            <p>I can give you a weather report of your city !</p>
            <input onChange={handleCity} type="text" placeholder="Enter your City name" className="mt-2 border border-black  rounded-md p-1"></input><br />
            <button onClick={getWeather} className="bg-black text-white p-1 mt-2 border rounded-md">Get Report</button>
            {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
            
            <div>


                <h1><b>Weather:</b>{weather}</h1>
                <h1><b>Temperature:</b>{temperature}</h1>
                <h1><b>Description:</b>{description}</h1>
            </div>
        </div>

    </div>)
}
export default Weather