import { forwardRef, useState, useEffect, type ReactElement, type Ref, type ComponentProps } from "react";
import type List from "./genericList/List";

const GenericForwardRef = forwardRef(
    function ListItem<T extends {id: number}>(props: ComponentProps<typeof List<T>>, ref: Ref<HTMLOListElement>){
        return(
            <ol ref={ref}>
                {props.data && props.data.map((item, index)=>(
                    <li key={index}>{props.renderItem(item)}</li>
                ))}
            </ol>
        )
    }
) as <T extends {id: number}>(
    props: ComponentProps<typeof List<T>> & {
        ref?:Ref<HTMLOListElement>
    }
)=>ReactElement;
export default GenericForwardRef;