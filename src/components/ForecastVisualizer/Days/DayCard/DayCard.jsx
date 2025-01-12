import { useEffect } from 'react';
import { MdWbSunny } from 'react-icons/md';



export default function DayCard({ onClick = () => { }, text = "", min = "", max = "", code }) {

    return (
        <div className="h-fit  flex flex-col gap-2 p-2 px-3 items-center transition-all 
                        cursor-pointer border-gray-400 border-t border-l rounded-lg
                        hover:bg-[#60606070] min-w-[50px] sm:min-w-[60px]"
            onClick={onClick}>
            <span>{text}</span>
            <div className='grid place-items-center'>
                {
                    code.icon
                }
            </div>
            <span className='text-[13px] px-2 flex font-semibold text-gray-300'>
                <span>
                    {max}°
                </span>
                <span className='px-[2px]'></span>
                <span>
                    {min}°
                </span>
            </span>
        </div>
    )
}