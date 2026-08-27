import type React from "react";

export default function ChangeEvent() {
    function changeInput (e: React.ChangeEvent<HTMLInputElement>) {
        console.clear();
        const {name, value} = e.target;
        if(e.target.checked) console.log(e.target.checked)
        console.log(name, value );
    }
    return (
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" name="test" onChange={changeInput} />
            <input type="checkbox" value="ok" name="checkbox" onChange={changeInput} />
        </form>
    )
}