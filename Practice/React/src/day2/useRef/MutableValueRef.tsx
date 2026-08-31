import { useRef, useState } from "react";

export default function MutableValueRef() {
    const ref = useRef(-1);
const [halfCount, setHalfCount] = useState(0);
function increamentClick( ) {
    ref.current++;
    if(ref.current %2 === 0) setHalfCount(halfCount + 1);
}
return (
    < >
    <p> Ref count: {ref.current} </p>
    <p> Half count: {halfCount} </p><br />

    <button onClick={increamentClick}>Half Increment</button>
    </ >
);

}