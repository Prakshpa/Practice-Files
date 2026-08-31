import type { Column } from "../../types/types";

export default function GenericTable<T extends Object>({data, columns}:{
    data: T[], columns: Column<T>[]
}){
    return (
        <table>
            <thead>
            <tr>
                {columns.map(column=><th key={String(column.key)}>{column.header}</th>) }
            </tr>
            </ thead>
            <tbody>
            {data.map((single, index)=>(
                <tr key={index} >
                    {columns.map(column=>(
                        <td key={String(column.key)}>{
                            (single[column.key] instanceof Object)? Object.values(single[column.key] as keyof T).join(" "): String(single[column.key])
                        }</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}