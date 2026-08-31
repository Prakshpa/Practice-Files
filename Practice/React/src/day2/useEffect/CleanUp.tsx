import { useEffect, useState } from "react";

export default function CleanUp() {
    const [width, setWidth] = useState(0);
    function resizeHandler (){
        setWidth(window.innerWidth);
    }

    useEffect(()=>{
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return ()=>{
            window.removeEventListener("resize", resizeHandler);
            console.log("clean up");
        }
    },[width]);

    return <p>Width: {width}</p>
}