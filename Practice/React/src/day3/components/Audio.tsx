import { useEffect } from "react";
import type { AudioProps } from "../types";

export default function Audio({audio,setAudio,togglePlay, setTime, timeRef, audioRef,
    setAudioData
}:AudioProps) {
    useEffect(()=>{
        setAudioData();
        document.addEventListener("DOMContentLoaded", ()=>{
            togglePlay();
        })
    },[])
    return (
        <div className="inline-block w-200">
            <audio ref={audioRef}>
                <source src={audio.src} type="audio/mpeg"/>
            </audio><br /><br />
            {0}<input type="range" min={0} className="h-2" ref={timeRef} max={audio.duration} onChange={(e)=>setTime(Number.parseFloat(e.target.value))} />{audio.duration}
            <button onClick={togglePlay} className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">{audio.play? "Pause":"Play"}</button>
            <button onClick={()=>setAudio("")} className="m-5 border-1 border-red-500">Close</button>
        </div>
    )
}