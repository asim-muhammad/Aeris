import Disclaimer from "./Disclaimer/Disclaimer";

import { LuBadgeInfo } from "react-icons/lu";
import WMOWeatherCodes from "../../WeatherCodes";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";

export default function CurrentInfo({ temp, code, lowest=0, highest=0}) {

    
    return (
        <div className="max-w-[1400px] m-auto">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col flex-1 pb-4">
                    <div className="flex items-center gap-4">
                        {<h1 className="text-[5em]">{temp}°</h1>}

                        <div className="w-full max-w-32  flex flex-col gap-2">
                            <div className="w-full rounded-full border-gray-500 flex items-center border-l border-t bg-[#4343435b] px-4 py-1">
                                <span className="text-gray-500">
                                    <GoArrowUpRight/>
                                </span>
                                <span className="text-gray-300 block ml-auto">{highest}°</span>
                            </div>
                            <div className="rounded-full border-gray-500 flex items-center border-l border-t bg-[#4343435b] px-4 py-1">
                                <span className="text-gray-500">
                                    <GoArrowDownRight/>
                                </span>
                                <span className="text-gray-300 block ml-auto">{lowest}°</span>
                            </div>
                        </div>
                    </div>

                    {(code || code == 0) &&
                        <h2 className="text-[2.25em] text-[#dadada] flex items-center gap-2">
                            <span className="text-[0.8em]">
                                {WMOWeatherCodes[code].icon}
                            </span> 
                            {WMOWeatherCodes[code].description}
                        </h2>
                    }
                </div>


                <div className="max-w-[30em] place-self-end flex gap-2 py-8 items-start bg-[#20202075] rounded-md border-gray-600 border-l border-t p-2">
                    <div className="w-20 aspect-square grid place-items-center">
                        <LuBadgeInfo />
                    </div>
                    <Disclaimer />
                </div>

            </div>
        </div>
    )
}