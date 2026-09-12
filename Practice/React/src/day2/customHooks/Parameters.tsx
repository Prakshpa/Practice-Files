import { useEffect, useState } from "react"
import type { RequestType } from "../types/types";


export const useToggle = (initialValue: boolean) => {
    const [toggle, setToggle] = useState(initialValue);
    const toggleValue = ()=>setToggle(toggle=>!toggle);

    return {toggle, setToggle: toggleValue}
}


export const useFetch = function <T>(url: string, requestOptions?: RequestType) {
    const [data, setData] = useState<T[]>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchData(){
        setLoading(true);
        setError("");
        setData(undefined);
        try {
            if(requestOptions!==undefined) {
                const response = await fetch(url, requestOptions);
                if(response.ok) setData(await response.json());
                else throw new Error("Failed to fetch data");
                
            }else {
                const response = await fetch(url);
                if (response.ok) setData(await response.json())
                else throw new Error("Failed to fetch data");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[])
    
    return {data, loading, error, fetchData};
}


export const useCounter = ({initialValue, incrementSize}: {
    initialValue: number, incrementSize?: number
}) => {
    const [count, setCount] = useState(initialValue);
    
    const increment = ()=>setCount(prev=>prev+((incrementSize===undefined)? 1: incrementSize));

    const reset = ()=>setCount(initialValue);

    return {count, setCount, increment, reset}
}


export const useNumberSort = (givenArray: number[])=>{
    const [array, setArray] = useState(givenArray)

    const ascSort = ()=>setArray(array.sort((a,b)=>a-b));

    const descSort = ()=>setArray(array.sort((a,b)=>b-a));

    return {array, setArray, ascSort, descSort}
}


export const useSort = function sort<T>(givenArray: T[], sortFunction: (a:T, b:T)=>number) {
    const [array, setArray] = useState<T[]>(givenArray)

    const sortAsc = ()=>setArray(array.sort(sortFunction));

    const sortDesc = ()=>{
        const tempArray = [...array.sort(sortFunction)];
        setArray([...tempArray.reverse()]);
    }
    return {array, setArray, sortAsc, sortDesc};
}