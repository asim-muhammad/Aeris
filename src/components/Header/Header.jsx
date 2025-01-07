import { useContext } from "react"

import { LocationContext } from "../../App"
import Location from "./Location/Location"
import SearchBar from "./SearchBar/SearchBar"

export default function Header(){
    const {city} = useContext(LocationContext);
    
    return (
        <div className="py-10 flex flex-col sm:flex-row-reverse ">
            <SearchBar/>
            <Location location={city}/>
        </div>
    )
}