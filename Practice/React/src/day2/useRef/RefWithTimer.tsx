import { useRef, useState } from "react";

export default function RefWithTimer() {
    const ref = useRef<ReturnType<typeof setTimeout>>(null)
    const [message, setMessage] = useState("");
    function startTimer() {
        setMessage("");
        if(ref.current !== null) return;
        
        ref.current = window.setTimeout(()=>{
            setMessage("Your 10 second is over");
        }, 10000);
    }
    function cancelTimeout(){
        if(ref.current !== null) {
            clearTimeout(ref.current);
        }
    }
    return (
        <><br /><br />
        <p>Timer RefTimer: {message}</p>
        <button onClick={startTimer}>Start 10 second timer</button>
        <button onClick={cancelTimeout}>Cancel the timer</button> <br /> <br />
        </>
    )
}