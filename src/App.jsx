import { LuBadgeInfo } from "react-icons/lu";
import { useEffect, useState, createContext } from "react";
import Days from "./components/Days/Days";
import Header from "./components/Header/Header"
import { WiRainMix } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiWindyFill } from "react-icons/ri";
import WeatherChart from "./components/WeatherChart/WeatherChart";
import Disclaimer from "./components/Disclaimer/Disclaimer";

export const LocationContext = createContext();

export default function App() {
  const [data, setData] = useState(null);
  const [currentList, setCurrentList] = useState();
  const [temp, setTemp] = useState();
  const [location, setLocation] = useState({ lat: 0, lon: 0 })


  const avg = (...values) => {
    let sum = values.reduce((a, b) => a + b);
    return sum / values.length
  }

  const createWeakList = (dates) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let datesObj = {
      DaysOrder: [],
    };

    let h = new Date().getHours();
    for (let i = 0; i < 7; i++) {
      let date = new Date(dates.time[i * 24]);
      let key = days[date.getDay()];
      datesObj.DaysOrder.push(key);
      datesObj[days[date.getDay()]] = dates.temperature_2m.slice(i * 24, i * 24 + 24);
    }
    setCurrentList(datesObj[datesObj.DaysOrder[0]]);

    setTemp(datesObj[datesObj.DaysOrder[0]][h]);
    setData(datesObj);
  }

  const handleDayClick = (day) => {
    setCurrentList(data[day])
  }

  useEffect(() => {
    const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=" + location.lat + "&longitude=" + location.lon + "&current=rain,weather_code&hourly=temperature_2m&temperature_unit=celsius&forecast_days=7";
    fetch(API_URL)
      .then((response) => response.json())
      .then((d) => {
        setData(d);
        createWeakList(d.hourly);

      }).catch((err) => {
        console.log(err);
      });
  }, [location]);

  const getPosition = (p) => {
    console.log(p)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      console.log("no permission");

    }
  }, [])

  return (
    <div className="h-full px-4 text-white relative bg-transparent">
      <LocationContext.Provider value={{ setLocation }}>
        <Header />
      </LocationContext.Provider>
      <div className="max-w-[1400px] m-auto">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center gap-4">
            {data && <h1 className="text-[5em]">{temp}°</h1>}

            <div className="w-full max-w-32  flex flex-col gap-2">
              <div className="w-full rounded-full border-gray-500 flex border-l border-t bg-[#4343435b] px-4 py-1">
                <span className="text-gray-500">H</span>
                <span className="text-gray-300 block ml-auto">{data && Math.round(Math.max(...data[data.DaysOrder[0]]))}°</span>
              </div>
              <div className="rounded-full border-gray-500 flex border-l border-t bg-[#4343435b] px-4 py-1">
                <span className="text-gray-500">F</span>
                <span className="text-gray-300 block ml-auto">{data && Math.round(Math.min(...data[data.DaysOrder[0]]))}°</span>
              </div>
            </div>

          </div>
          <div className="max-w-[30em] place-self-end flex gap-2 py-8 items-start bg-[#20202075] rounded-md border-gray-600 border-l border-t p-2">
            <div className="w-20 aspect-square grid place-items-center">
              <LuBadgeInfo />
            </div>
            <Disclaimer />
          </div>

        </div>
      </div>

      <div></div>
      <div className="h-full -z-10 w-full top-0 left-0 absolute bg-center brightness-[30%] bg-cover bg-[url('./assets/background.jpg')]"></div>

      <div className="pt-8 max-w-[1400px] m-auto rounded-lg flex items-center flex-col sm:flex-row">

        {
          data &&
          <>
            <WeatherChart data={currentList} />
            <div className="px-4 h-fit mt-8 w-full flex-grow-[2]">
              <Days data={data}
                onDayClick={handleDayClick} />

              <ul className="pt-4 text-gray-100">
                <li className="flex py-1 items-center gap-2">
                  <WiRainMix fill="#bcbcbc" size={20} />
                  <span>Precipitation: 0%</span>
                </li>
                <li className="flex py-1 items-center gap-2">
                  <MdOutlineWaterDrop fill="#bcbcbc" size={20} />
                  <span>Humadity: 90%</span>
                </li>
                <li className="flex py-1 items-center gap-2">
                  <RiWindyFill fill="#bcbcbc" size={20} />
                  <span>Wind: 10km/h</span>
                </li>
              </ul>
            </div>
          </>
        }

      </div>
    </div>
  )
}