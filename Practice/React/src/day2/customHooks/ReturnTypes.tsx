import { useState } from "react"
import type { User } from "../types/types";

export const useUser = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (data: User)=>{
        if(localStorage.getItem(data.email) === data.password) setLoggedIn(true);
        else setLoggedIn(false);
    }
    return [loggedIn, login] ;
}

export const useUserObject = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (data: User)=>{
        if(localStorage.getItem(data.email) === data.password) setLoggedIn(true);
        else setLoggedIn(false);
    }
    return {loggedIn, login}
}