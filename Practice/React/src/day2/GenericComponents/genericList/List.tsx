import type React from "react";

export default function List<T extends {id:number}>({data, renderItem}:{
    data: T[], renderItem: (item: T)=>React.ReactNode
}){
    return(
        <ol>
            {data.map((item, index)=>(
                <li key={index}>{renderItem(item)}</li>
            ))}
        </ol>
    )
}