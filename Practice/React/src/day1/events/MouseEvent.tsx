import type React from "react";

export default function MouseEvent() {
    function handleMouseEvent(e:React.MouseEvent) {
        // console.log(`Client X, Y: ${e.clientX}, ${e.clientY}`);
        // console.log(`Screen X, Y: ${e.screenX}, ${e.screenY}`);
        // console.log(`Page X, Y: ${e.pageX}, ${e.pageY}`);
        // console.log("Related target: ",e.relatedTarget);
        console.log("currentTarget: ", e.currentTarget);
        console.log("target: ", e.target);
    }
    return (
        <>
        <div onClick={handleMouseEvent}>
            <p>Hello World</p>
        </div>
        <button onMouseOver={handleMouseEvent}>Move mouse over me</button>
        </>
    );
}