import { MdMyLocation } from "react-icons/md";

export default function({location = "Loading..."}){
    return (
        <div className="flex m-4 items-center gap-4">
          <MdMyLocation />
          {location}
        </div>
    )
}