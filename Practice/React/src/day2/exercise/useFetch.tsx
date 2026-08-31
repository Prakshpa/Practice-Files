import { useEffect, useState } from "react";
import type { FetchState } from "../types/union";


export const useFetch = function<T>(api: string) {
    const [fetchState, setFetchState] = useState<FetchState<T>>({state: "idle"});

    async function fetchData(){
        try {
            setFetchState({state: "loading"});
            const response= await fetch(api);
            if(response.ok ) {
                const data = await response.json();
                if(!data || data.length>0){
                    setFetchState({state: "success", data: data as T[] });
                }
            }
        } catch (error) {
            if(error instanceof Error){
                setFetchState({state: "error", error: error.message})
            }else {
                setFetchState({state: "error", error: "An unknown error occured"});
            }
        }

    }

    useEffect(()=>{
        fetchData();
    },[]);

    return { data: fetchState, fetchData}
}