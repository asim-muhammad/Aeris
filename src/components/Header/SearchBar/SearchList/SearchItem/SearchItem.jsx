export default function SearchItem({ text, code, country, admin, onClick= ()=>{}}) {
    return (
        <li className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-[#a3a3a341] transition-colors rounded-md my-1 mx-2"
            onClick={onClick}>
            <div className="rounded-full overflow-hidden grid place-items-center w-7 h-7">
            <img src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`} width="48"/>
            </div>
            <div className="flex flex-col max-w-[220px]">
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                    {text}
                </span>
                <span className="text-gray-400 text-[14px] whitespace-nowrap text-ellipsis overflow-hidden">
                    {admin ? admin + " - ": ""} {country}
                </span>
            </div>
        </li>
    )
}