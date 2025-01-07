export default function ({url}) {
    
    return (
        <div className={`h-full -z-10 w-full top-0 left-0 absolute bg-center brightness-[30%] bg-cover bg-[url('${url}')]`}></div>
    )
}