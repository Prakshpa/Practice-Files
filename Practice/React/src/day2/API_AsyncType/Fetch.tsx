import { useEffect, useState } from "react";
import type { RequestType } from "../types/types";

export const useFetch = (url: string, requestOptions?: RequestType) => {
    const [data, setData] = useState<unknown[]>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const response = async function fetchData(){
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
                if(error instanceof Error) setError(error.message);
                else throw new Error("An unexpected error occured");
            } finally {
                setLoading(false);
            }
        }
        response();
    }, [data, error, loading])
    
    return {data, loading, error};
}