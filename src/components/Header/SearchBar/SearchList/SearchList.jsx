import SearchItem from "./SearchItem/SearchItem";
import {useContext} from "react";
import { LocationContext } from "../../../../App";

export default function SearchList({ data= [] }) {

    const {setLocation} = useContext(LocationContext);

    const handleItemClick = (lat, long)=> {
        setLocation(prevL => ({
            "lat": lat, "lon": long
        }));
    }

    return (
        <ul className="w-full">
            {
                data.results.map(item => <SearchItem 
                                            text={item.name}
                                            code={item.country_code.toLowerCase()}
                                            country={item.country}
                                            admin={item.admin1}
                                            onClick={()=> handleItemClick(item.latitude, item.longitude)}/>)
            }
        </ul>
    )
}