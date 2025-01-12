import { useState, useEffect } from "react";

import WeatherChart from "./WeatherChart/WeatherChart"
import Days from "./Days/Days"
import DailyInfo from "./Days/DailyInfo/DailyInfo";

export default function ForecastVisualizer({weatherData}) {
    const [currentList, setCurrentList] = useState();
    const [day, setDay] = useState(weatherData["daysOrder"][0]);

    useEffect(() => {
        setCurrentList(weatherData[weatherData.daysOrder[0]].temperature)
    }, [weatherData]);

    const handleDayClick = (day) => {
        setCurrentList(weatherData[day].temperature)
        setDay(day);
    }

    if (!currentList) {
        return (
            <div className="w-full grid place-items-center py-4 mt-8">
                <span >Loading...</span>
            </div>
        )
    }

    return (
        <div className="pt-8 max-w-[1400px] m-auto rounded-lg flex items-center flex-col sm:flex-row">

            <WeatherChart data={currentList} />
            <div className="px-4 h-fit mt-8 w-full flex-grow-[2]">
                <Days 
                    weatherData={weatherData}
                    onDayClick={handleDayClick} />
                <DailyInfo 
                        prec={Math.round(weatherData[day].precipitation)}
                        humidity={weatherData[day].humidity.toFixed(2)}
                        windSpeed={weatherData[day].windSpeed.toFixed(2)}/>
            </div>
        </div>
    )
}