import { useEffect, useMemo, useRef, useState, type SubmitEvent } from "react";
import SearchBar from "./components/SearchBar";
import useAudioPlayer from "./useAudioPlayer";
import List from '../day2/GenericComponents/genericList/List';
import { links } from "./Links";
import Audio from "./components/Audio";
import type { AudioItem } from "./types";

function App() {
    const ref=useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [filteredSongs, setFilteredSongs] = useState<AudioItem[]>()
    const {audio, setAudio, togglePlay, timeRef, audioRef, setAudioData, setTime} = useAudioPlayer();
    
    
    useEffect(()=>{
        setFilteredSongs(links)
    },[])
    useMemo(()=>{
        searchSongs()
    }, [input])
    useEffect(()=>{
        if(audioRef.current !==null) {
            (audio.play)? audioRef.current.play() : audioRef.current.pause();
        }else console.log("An error occured");
    },[audio])

    function searchHandle(e: SubmitEvent) {
        e.preventDefault();
        if(ref.current===null) console.log("An error occured");
        searchSongs()
    }
    function searchSongs(){
        const filtered = links.filter(data=> data.title.indexOf(input)>=0)
        setFilteredSongs(filtered)
    }
    function changeInput(value:string){
        setInput(value);
    }
    return (
        <>
        <SearchBar searchHandle={searchHandle} changeInput={changeInput} ref={ref}/>
        <main className="flex flex-row my-10">
        {audio.src!=="" && <Audio audio={audio} setTime={setTime} setAudio={setAudio} togglePlay={togglePlay}
        timeRef={timeRef} audioRef={audioRef} setAudioData={setAudioData}/>}
        
        <List<typeof links[0]> data={filteredSongs as AudioItem[]} renderItem={(item)=>(
            <>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <button onClick={()=>setAudio(item.src)} className="bg-gray-300 py-1 px-2 rounded text-blue-800 hover:bg-gray-900 hover:text-blue-100" >Listen to it</button>
            </>
        )} />
        </main>
        </>
    );
}
export default App;