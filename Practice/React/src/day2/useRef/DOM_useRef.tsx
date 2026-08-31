import { useRef, useState } from "react";

export default function DOM_useRef() {
    const ref = useRef<HTMLInputElement>(null);
    const [fresh, setFresh]=useState(false)
    function buttonClick( ) {
        ref.current?.focus();
    }
    setTimeout(()=>{
        setFresh(!fresh);
    }, 5000);
    return (
        < >
        <input type="text" ref = {ref} /> 
        <button onClick = {buttonClick} >Focus input </button>
        {ref.current?.value==="done" && <input ref={ref} /> }
        </ >
    );
}