import { useEffect, useState, createContext } from "react";

import Header from "./components/Header/Header"
import ForecastVisualizer from "./components/ForecastVisualizer/ForecastVisualizer";
import Background from "./components/Background/Background";
import CurrentInfo from "./components/CurrentInfo/CurrentInfo";

export const LocationContext = createContext();

export default function App() {
  const [data, setData] = useState();
  const [temp, setTemp] = useState();
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const [precipitations, setPrecipitations] = useState({ ka: "sdf" });
  const [city, setCity] = useState();

  /**Calls the API every time the location state change*/
  useEffect(() => {
    const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=" + location.lat + "&longitude=" + location.lon + "&current=rain,weather_code&hourly=temperature_2m,precipitation&temperature_unit=celsius&forecast_days=7";
    fetch(API_URL)
      .then((response) => response.json())
      .then((d) => {
        setData(d)

        createWeakList(d);
      }).catch((err) => {
        console.log(err);
      });

  }, [location]);

  const createWeakList = (d) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    /**Object containing all the data about temperatures*/
    let datesObj = {
      DaysOrder: [],
    };
    let precepObj = {};

    let h = new Date().getHours();
    for (let i = 0; i < 7; i++) {
      let date = new Date(d.hourly.time[i * 24]);
      let key = days[date.getDay()];
      datesObj.DaysOrder.push(key);
      datesObj[days[date.getDay()]] = d.hourly.temperature_2m.slice(i * 24, i * 24 + 24);

      let prec = d.hourly.precipitation.slice(i * 24, i * 24 + 24).reduce((accu, current) => accu + current, 0);
      precepObj[key] = prec;
    }


    setTemp(datesObj[datesObj.DaysOrder[0]][h]);
    setData(datesObj);
    setPrecipitations(precepObj);
  }

  const loc = (e)=> {
    const  {latitude, longitude} = e.coords;
    setLocation(l=> ({lat : latitude, lon : longitude}));
  }

  const errorHandler = (e)=> {
    console.log(e);
    
  }


  useEffect(()=> {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(loc, errorHandler);
    }else{
      console.log("Geo location is not supported by yout browser");
      
    }
  }, [])

  return (
    <div className="h-full px-4 flex flex-col text-white relative bg-transparent">
      <div>
        <LocationContext.Provider value={{ setLocation, setCity, city}}>
          <Header />
        </LocationContext.Provider>

        <CurrentInfo data={data} temp={temp} />
      </div>

      <ForecastVisualizer
        data={data}
        precipitations={precipitations}
      />
      <Background url={"./assets/background.jpg"} />
    </div>
  )
}