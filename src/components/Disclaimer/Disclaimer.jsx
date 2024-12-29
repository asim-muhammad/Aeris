import { GoArrowUpRight } from "react-icons/go";

export default function Disclaimer() {
    return (
        <p>
            <strong>Disclaimer:</strong> This web app is designed for personal and informational purposes only.
            Weather data is fetched using the <span className="px-[1px]"></span> 
            <a href="https://open-meteo.com/" target="_blank" className="inline-flex gap-2 items-center pr-2 font-bold cursor-pointer
                        hover:underline">
                OpenMeteo API <GoArrowUpRight/>
            </a>.
            Accuracy and reliability depend on the data provided by the API.
        </p>
    )
}