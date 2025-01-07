import Disclaimer from "./Disclaimer/Disclaimer";

import { LuBadgeInfo } from "react-icons/lu";

export default function CurrentInfo({temp, data}) {
    return (
        <div className="max-w-[1400px] m-auto">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 items-center gap-4">
                    {data && <h1 className="text-[5em]">{temp}°</h1>}

                    <div className="w-full max-w-32  flex flex-col gap-2">
                        <div className="w-full rounded-full border-gray-500 flex border-l border-t bg-[#4343435b] px-4 py-1">
                            <span className="text-gray-500">H</span>
                            <span className="text-gray-300 block ml-auto">{data ? Math.round(Math.max(...data[data.DaysOrder[0]])) : "0"}°</span>
                        </div>
                        <div className="rounded-full border-gray-500 flex border-l border-t bg-[#4343435b] px-4 py-1">
                            <span className="text-gray-500">F</span>
                            <span className="text-gray-300 block ml-auto">{data ? Math.round(Math.min(...data[data.DaysOrder[0]])) : "0"}°</span>
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
    )
}