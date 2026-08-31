import { useEffect, useState } from "react";

export default function AsyncLogic() {
    const [data, setData] = useState<unknown>()
    useEffect(()=>{
        const response = async ()=>{
            const response = await fetch("testapi.com")
            if(response.ok) setData(await response.json())
        }
        response();
    },[])
    return <p>Data: {JSON.stringify(data as Object)}</p>
}