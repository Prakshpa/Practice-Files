import { forwardRef, useImperativeHandle, useState, useEffect, ReactElement, Ref, ComponentProps } from "react";
import type { List } from "./genericList/List";

const GenericForwardRef = forwardRef(
    function ListItem<T>(props: ComponentProps<List<T>>, ref: Ref<HTMLOListElement>){
        const [data, setData] = useState<T>();
        useEffect(()=>{
            setData(props.data);
        },[])
        return(
            <ol ref={ref}>
                {data && data.map((item, index)=>(
                    <li key={index}>{props.renderItem(item)}</li>
                ))}
            </ol>
        )
    }
) as <T>(
    props: ComponentProps<List<T>> & {
        ref?:Ref<HTMLOListElement>
    }
)=>ReactElement;
export default GenericForwardRef;