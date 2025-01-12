import { WiRainMix } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiWindyFill } from "react-icons/ri";


export default function ({prec, humidity, windSpeed}) {
    return (
        <ul className="pt-4 text-gray-100">
            <li className="flex py-1 items-center gap-2">
                <WiRainMix fill="#bcbcbc" size={20} />
                <span>Precipitation: {prec}%</span>
            </li>
            <li className="flex py-1 items-center gap-2">
                <MdOutlineWaterDrop fill="#bcbcbc" size={20} />
                <span>Humidity: {humidity}%</span>
            </li>
            <li className="flex py-1 items-center gap-2">
                <RiWindyFill fill="#bcbcbc" size={20} />
                <span>Wind: {windSpeed}km/h</span>
            </li>
        </ul>
    )
}