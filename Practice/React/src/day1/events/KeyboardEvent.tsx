import type React from "react";

export default function KeyboardEvent() {
    function keyboardEvent(e: React.KeyboardEvent<HTMLInputElement>) {
        e.currentTarget.value+= e.shiftKey? e.key.toUpperCase() : e.key;
        
    }
    return (
        <form onSubmit={ (e)=> e.preventDefault()}>
            <input type="text" onKeyDownCapture={keyboardEvent} />
        </form>
    );
}