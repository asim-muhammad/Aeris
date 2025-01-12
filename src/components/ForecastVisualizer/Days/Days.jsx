import { useEffect, useState } from "react";
import DayCard from "./DayCard/DayCard";

import WMOWeatherCodes from "../../../WeatherCodes"; 

export default function Days({weatherData, onDayClick = () => { } }) {

  const [minMax, setMinMax] = useState({ min: [], max: [] })

    useEffect(() => {
        const min = [];
        const max = [];
        weatherData.daysOrder.forEach(day => {
            min.push(Math.min(...weatherData[day].temperature));
            max.push(Math.max(...weatherData[day].temperature));
        })
        setMinMax({ min, max });
    }, [weatherData])

    return (
        <div>
            <div className="w-full grid grid-cols-4 h-full gap-4
                        xm:grid-cols-6 sm:flex sm:flex-wrap">
                {
                    weatherData.daysOrder.map((day, index) => (
                        <DayCard key={index} text={day.substring(0, 3)}
                            onClick={() => onDayClick(day)}
                            min={Math.round(weatherData[day].min)}
                            max={Math.round(weatherData[day].max)}
                            code={WMOWeatherCodes[weatherData[day].weatherCode]}
                        />
                    ))
                }
            </div>
        </div>
    )
}
