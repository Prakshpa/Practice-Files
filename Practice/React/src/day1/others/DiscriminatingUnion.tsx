import { useEffect, useState } from "react";

export default function DescriminatingUnion() {
    interface BaseOne {
        type: string,
    }
    interface Type1 extends BaseOne {
        type: "Type1",
        message: string
    }
    interface Type2 extends BaseOne{
    type: "Type2",
    data: string[]
    }
    const data: Type1 | Type2 = {type: "Type1", message: "I am type 1"}

    type State = | {name: "circle", radius: number }
            | {name: "rectangle", length: number, breadth: number }
    const [shapeData, setShapeData] = useState<State>({name: "rectangle", length: 7, breadth: 10});
    
    useEffect(()=>{
        setTimeout(()=>{
            setShapeData({name:"circle", radius: 7});
        }, 5000);
    }, []);
    switch(shapeData.name){
        case "circle" : 
            console.log("Area of circle is ", shapeData.radius * shapeData.radius * 3.14);
            return;
        case "rectangle": 
            console.log("Area of rectangle is ", shapeData.length * shapeData.breadth);
            break;
    }

    return (
        <>
        {(data.type==="Type1")? <p>{data.message}</p>: "" /* No assertion required*/} 


        </>
    )
}