import { useEffect, useState } from "react";
import DayCard from "./DayCard/DayCard";

export default function Days({ data = [], onDayClick = () => { } }) {

    const [minMax, setMinMax] = useState({ min: [], max: [] })
    

    useEffect(() => {
        const min = [];
        const max = [];
        data.DaysOrder.forEach(day => {
            min.push(Math.min(...data[day]));
            max.push(Math.max(...data[day]));
        })

        setMinMax({ min, max });

    }, [data])

    return (
        <div className="w-full grid grid-cols-4 h-full gap-4
                        xm:grid-cols-6 sm:flex sm:flex-wrap
                        ">
            {
                data.DaysOrder.map((day, index) => (
                    <DayCard key={index} text={day.substring(0, 3)}
                        onClick={() => onDayClick(day)}
                        min={Math.ceil(minMax.min[index]) + "°"}
                        max={Math.floor(minMax.max[index]) + "°"}
                    />
                ))
            }
        </div>
    )
}
