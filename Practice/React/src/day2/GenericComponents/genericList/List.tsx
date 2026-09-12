import type React from "react";

export default function List<T extends {id:number}>({data, renderItem}:{
    data: T[], renderItem: (item: T)=>React.ReactNode
}){
    return(
        <ol className="flex flex-row list-none flex-wrap">
            {data.map((item, index)=>(
                <li key={index} className="m-2 p-2 border-1 border-green-500 rounded-xl hover:bg-green-300 hover:text-blue-900">{renderItem(item)}</li>
            ))}
        </ol>
    )
}