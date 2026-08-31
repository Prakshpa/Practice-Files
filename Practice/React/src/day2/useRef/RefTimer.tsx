import { useRef } from "react"

export default function RefTimer() {
    const ref = useRef<ReturnType<typeof setTimeout>>(null);
    function setTimer() {
        ref.current = setTimeout(()=>{
            console.log("Done");
        });
        setTimeout(() => {
            console.log(ref.current);
        }, 1000);
    }
    return (
        <button onClick={setTimer}>Start timer</button>
    )
}