import Location from "./Location/Location"
import SearchBar from "./SearchBar/SearchBar"

export default function Header(){
    return (
        <div className="py-10 flex flex-col sm:flex-row-reverse ">
            <SearchBar/>
            <Location location="Paris, France"/>
        </div>
    )
}