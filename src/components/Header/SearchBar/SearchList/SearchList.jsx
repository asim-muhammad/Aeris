import SearchItem from "./SearchItem/SearchItem";
import { useContext } from "react";
import { LocationContext } from "../../../../App";

export default function SearchList({ data = [] }) {

    const { setLocation, setCity} = useContext(LocationContext);

    const handleItemClick = (lat, long, city) => {
        setLocation({
            "lat": lat, "lon": long
        });

        setCity(city);
    }

    return (
        <ul className="w-full">
            {
                data.results.map((item, index) => <SearchItem
                    key={index}
                    text={item.name}
                    code={item.country_code.toLowerCase()}
                    country={item.country}
                    admin={item.admin1}
                    onClick={() => handleItemClick(
                        item.latitude,
                        item.longitude,
                        item.name + ", " + item.country)} />)
            }
        </ul>
    )
}