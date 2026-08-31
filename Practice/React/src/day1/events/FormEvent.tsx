import type React from "react";

export default function FormEvent() {
    function formEvent(e:React.SubmitEvent) {
        e.preventDefault();
        console.log("Event Type", e.type);
        e.currentTarget.innerHTML+="<p>Event Triggered</p>";
    }

    return (
        <form onSubmit={formEvent}>
            <input type="submit" value="Submit" />
        </form>
    );
}