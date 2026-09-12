import { useRef, useState } from "react";
import type { Audio } from "./types";

const useAudioPlayer = () => {
    const playTimer=useRef<ReturnType<typeof setInterval>>(undefined);
    const audioRef = useRef<HTMLAudioElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const [audio, setAudio] = useState<Audio>({
        src: "",
        duration: 0,
        time: 0,
        play: false
    });

    const togglePlay = ()=>{
        if(audio.play){
            audioRef.current?.pause();
            if(playTimer.current!==undefined){
                clearInterval(playTimer.current);
                playTimer.current=undefined;
            }
        }else{
            audioRef.current?.play();
            playTimer.current = setInterval(()=>{
                if(timeRef.current!==null && audioRef.current!==null){
                    setAudio(prev=>{
                        if(audioRef.current!==null && timeRef.current!==null) {
                            timeRef.current.value=`${audioRef.current.currentTime}`;
                            console.log(timeRef.current.value, audio.duration);
                            if(audio.duration-1 <= audio.time) clearInterval(playTimer.current)
                            return {...prev, time: audioRef.current.currentTime}
                        }else {
                            console.log("Some error");
                            return prev;
                        }
                    });
                }
            },audio.duration*10);
        }
        setAudio(prev=>({
            ...prev,
            play: !prev.play
        }))
    }

    return {
        setAudio: (src:string)=>{
            if(playTimer.current!==undefined){
                clearInterval(playTimer.current);
                playTimer.current=undefined;
            }
            setAudio({
                src,
                duration:0,
                time:0,
                play: false
            });
        },
        togglePlay,
        setAudioData: ()=>{
            if(audioRef.current!==null){
                audioRef.current.addEventListener("loadedmetadata", (e)=>{
                    setAudio({
                        ...audio,
                        duration:(e.target as HTMLAudioElement).duration
                    });
                })
            }else{
                setAudio({...audio, duration: 10});
            }      
        },
        setTime: async(time:number)=>{
            if(audioRef.current !== null){
                audioRef.current.pause();
                audioRef.current.currentTime = time;
                await audioRef.current.play();
            }

        },
        timeRef,
        audio,
        audioRef
    }
}

export default useAudioPlayer;