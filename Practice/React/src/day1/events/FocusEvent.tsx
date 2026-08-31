import type React from "react";

export default function FocusEvent() {
    function focusEvent(e:React.FocusEvent<HTMLButtonElement | HTMLInputElement>) {
        console.log("Focus event: ", e.type);
        if(e.type === "blur") e.currentTarget.focus();
    }
    return (
        <>
        <button onFocusCapture={focusEvent} onBlur={focusEvent}>
            hello World
        </button>
        <input type="text" onFocus={focusEvent} onBlur={focusEvent} />
        </>
    )
}