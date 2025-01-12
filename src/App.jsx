import { useEffect, useState, createContext } from "react";

import Header from "./components/Header/Header"
import ForecastVisualizer from "./components/ForecastVisualizer/ForecastVisualizer";
import Background from "./components/Background/Background";
import CurrentInfo from "./components/CurrentInfo/CurrentInfo";

export const LocationContext = createContext();

export default function App() {
  const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;
  

  const places = [
    { lat: 40.7128, lon: -74.0060 }, // New York
    { lat: 48.8566, lon: 2.3522 },   // Paris
    { lat: 35.6895, lon: 139.6917 }, // Tokyo
    { lat: -33.8688, lon: 151.2093 }, // Sydney
    { lat: 30.0444, lon: 31.2357 },  // Cairo (Pyramids of Giza)
    { lat: -22.9519, lon: -43.2105 }, // Rio de Janeiro (Christ the Redeemer)
    { lat: 27.1751, lon: 78.0421 },  // Agra (Taj Mahal)
    { lat: 13.1631, lon: -72.5450 }, // Machu Picchu, Peru
    { lat: 41.8902, lon: 12.4922 },  // Rome (Colosseum)
    { lat: 35.3606, lon: 138.7274 }  // Mount Fuji, Japan
  ];



  const [location, setLocation] = useState(places[Math.round(Math.random() * (places.length - 1))])
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(true);

  /**Calls the API every time the location state change*/
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&
          current=rain,weather_code&
          hourly=temperature_2m,relative_humidity_2m&
          temperature_unit=celsius&forecast_days=7&
          daily=weather_code,precipitation_probability_max,wind_speed_10m_max,temperature_2m_max,temperature_2m_min`.replace(/\s/g, '');
  
        const response = await fetch(API_URL);
        const d = await response.json();
  
        if (!d || !d.hourly || !d.daily) {
          console.error("Invalid weather data received");
          setWeatherData(null);
          return;
        }
  
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weatherDataObject = { daysOrder: [] };
  
        for (let i = 0; i < 7; i++) {
          const start = i * 24;
          const end = start + 24;
          const date = new Date(d.hourly.time[start]);
          const key = days[date.getDay()];
  
          const humidity = d.hourly.relative_humidity_2m.slice(start, end)
            .reduce((accu, current) => accu + current, 0);
  
          weatherDataObject.daysOrder.push(key);
          weatherDataObject[key] = {
            humidity: humidity / 24,
            weatherCode: d.daily.weather_code[i],
            precipitation: d.daily.precipitation_probability_max[i],
            windSpeed: d.daily.wind_speed_10m_max[i],
            temperature: d.hourly.temperature_2m.slice(start, end),
            min: d.daily.temperature_2m_min[i],
            max: d.daily.temperature_2m_max[i],
          };
        }
  
        weatherDataObject.weatherCode = d.current.weather_code;
  
        setWeatherData(weatherDataObject);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };
  
    fetchWeatherData();
  }, [location]);
  


  /**An api to get the user location name if permission is granted */
  /**This function is only called once after the page is loaded*/
  const getLocationName = async (lat, lon) => {
    const response = await fetch("https://geocode.maps.co/reverse?lat=" + lat + "&lon=" + lon + "&api_key=" + apiKey);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tmp = data.display_name.split(",");
    return tmp[0] + ", " + tmp[tmp.length - 1];
  }

  /**Successfully got the user location */
  const useUserLocation = async (e) => {
    const { latitude, longitude } = e.coords;

    try {
      const cityName = await getLocationName(latitude, longitude);
      setCity(cityName);
      setLocation({ lat: latitude, lon: longitude });

    } catch (err) {
      console.log(err);
    }
  }

  /**Couldn't get the use location */
  const handleLocationError = async (error) => {
    console.log("Could not get the coordinates :(");
    try {
      const cityName = await getLocationName(location.lat, location.lon);
      setCity(cityName);
    } catch (err) {
      console.log(err);
    }
  }

  /**Tract user location on startup */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(useUserLocation, handleLocationError);
    } else {
      console.log("Geo location is not supported by yout browser");
    }
  }, [])



  return (
    <>
      {
        !loading &&
        <div className="h-full px-4 flex flex-col text-white relative bg-transparent">
          <div>
            <LocationContext.Provider value={{ setLocation, setCity, city }}>
              <Header />
            </LocationContext.Provider>

            <CurrentInfo
              temp={weatherData[weatherData["daysOrder"][0]].temperature[new Date().getHours()]}
              code={weatherData["weatherCode"]}
              lowest={weatherData[weatherData.daysOrder[0]].min}
              highest={weatherData[weatherData.daysOrder[0]].max} />
          </div>

          <ForecastVisualizer
            weatherData={weatherData}
          />
          <Background />
        </div>
      }
    </>
  )
}