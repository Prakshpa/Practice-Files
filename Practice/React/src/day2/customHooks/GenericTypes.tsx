import { useState } from "react"

export const useLocalStorage = function <T>(key: string, givenData : T) {
    const [data, setData] = useState<T>(givenData);
    if(localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(data));

    const setLocalStore = (data: T)=>{
        localStorage.setItem(key, JSON.stringify(data));
    }

    const getLocalStore = () => {
        const localData = localStorage.getItem(key)!;
        setData(JSON.parse(localData) as T);
    }

    return {setLocalStore, getLocalStore}

}