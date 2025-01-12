import { IoSearchOutline } from "react-icons/io5";
import SearchList from "./SearchList/SearchList";
import { useEffect, useState } from "react";

export default function () {
    const [search, setSearch] = useState("");
    const [data, setData] = useState();

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (!e.target.closest(".search-bar")) {
                setData(prev => { })
            }
        }
        document.addEventListener("click", handleDocumentClick);

    }, [])

    const callGeoAPI = () => {
        const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + search + "&count=5&language=en&format=json";
        fetch(url)
            .then((response) => response.json())
            .then((d) => setData(prev => d))
            .catch(err => console.log(err)
            )
    }

    return (
        <div className="flex-1 relative min-h-12 w-full search-bar" onClick={() => callGeoAPI()}>
            <div className="flex flex-col justify-center w-full top-0  transition-[background]
             has-[:focus]:bg-black bg-[#00000050] rounded-xl py-2  ml-auto absolute 
             right-0 sm:w-fit">
                <div className="flex h-9 pr-2">
                    <input type="text" className="w-full focus:outline-none px-6 bg-transparent"
                        value={search} onChange={(e) => {
                            setSearch(e.currentTarget.value)
                            callGeoAPI()
                        }}
                        onKeyDown={(e) => {
                            if (e.code == "Enter") {
                                callGeoAPI()
                            }
                        }}
                    />
                    <button className="w-12 aspect-square grid place-items-center rounded-full"
                        onClick={() => callGeoAPI()}>
                        <IoSearchOutline color="white" />
                    </button>
                </div>

                <div className="search-list duration-300 w-full transition-all max-h-[0px] overflow-y-auto">
                    {data && data.results &&
                        <SearchList data={data} />}
                </div>
            </div>
        </div>
    )
}