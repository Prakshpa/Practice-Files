import { useEffect, useRef, useState } from "react"

export default function RefWithInterval() {
    const ref = useRef<ReturnType<typeof setInterval>>(null);
    const [time, setTime] = useState({minutes: 0, seconds: 0});
    function setTimer() {
        if (ref.current !==null ) return;
        ref.current = window.setInterval(()=>{
            setTime(prevState=>{
                if(prevState.seconds<59) {
                    return { ...prevState, seconds: prevState.seconds+1 }
                }
                return { minutes: prevState.minutes+1, seconds: 0 }
            });
        }, 1000);
    }
    function stopTimer() {
        if(ref.current!==null) {
            clearInterval(ref.current);
            ref.current=null;
        }
    }
    useEffect(() => {
        return () => {
            if (ref.current !== null) {
            clearInterval(ref.current);
            }
        };
    }, []);
    return (
        <>
        <button onClick={setTimer}>Start timer</button>
        <button onClick={stopTimer}>Stop[o]</button>
        <p>Timer: {`${time.minutes<10? "0"+time.minutes:time.minutes} : ${time.seconds<10? "0"+time.seconds:time.seconds}` }</p>
        </>
    );
}