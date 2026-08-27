import type React from "react";

export default function SyntheticEvent() {
    function handleSyntheticEvent(e: React.SyntheticEvent){
        console.log("SyntheticEvent captured");
        console.log("Event Timestapmp: ", e.timeStamp);
        console.log("Event type: ", e.type);
        console.log("")
    }
    return (
        <button onClick={handleSyntheticEvent} onMouseOver={handleSyntheticEvent}>Click Me</button>
    )
}