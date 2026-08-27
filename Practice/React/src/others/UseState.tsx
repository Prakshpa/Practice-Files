import { useState } from "react";

export default function UseState(){
    const [count, setCount] = useState(0);
    const [data, setData] = useState({id: 0, name: ""});

    const [numberArray1, setNumberArray1] = useState([0])
    // const [numberArray2, setNumberArray2] = useState([]);
    const [genericNumberArray, setGenericNumberArray] = useState<number[]>();



    function changeAll(){
        setCount(count+1);
        setData({id :data.id+1, name: "Ram"});

        setNumberArray1([...numberArray1, count]);
        // setNumberArray2([...numberArray2, count])
        setGenericNumberArray((prevArray)=>{
            if(prevArray == undefined) return [count];
            else return [...(genericNumberArray as number[]), count];
        })
    }
    return (
        <>
        <button onClick={changeAll}>
            Count = {count}
        </button>
        <p>Data : {data.id}: {data.name}</p>
        <p>inferenced number array: {numberArray1.toString()}</p>
        <p>Generic number array: { genericNumberArray?.toString() }</p>

        </>
    )
}