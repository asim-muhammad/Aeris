import { useState, useEffect } from "react";

import WeatherChart from "./WeatherChart/WeatherChart"
import Days from "./Days/Days"

import { WiRainMix } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiWindyFill } from "react-icons/ri";

export default function ForecastVisualizer({ precipitations, data }) {
    const [currentList, setCurrentList] = useState();


    useEffect(() => {
        if (data) {
            setCurrentList(data[data.DaysOrder[0]])
        }
    }, [data]);

    const handleDayClick = (day) => {
        setCurrentList(data[day])
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
                <Days data={data}
                    onDayClick={handleDayClick} />

                <ul className="pt-4 text-gray-100">
                    <li className="flex py-1 items-center gap-2">
                        <WiRainMix fill="#bcbcbc" size={20} />
                        <span>Precipitation: {precipitations["Sunday"]} mm</span>
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
        </div>
    )
}