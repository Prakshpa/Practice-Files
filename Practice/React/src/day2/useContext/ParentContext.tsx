import React, { createContext, useState } from "react";
export interface User {
    id: number,
    name: string,
    address: string
}

export const UserContext = createContext<User | undefined>(undefined);
export default function ParentContext({children}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User>({id: 0, name: "", address: ""});
    function changeUser(name:string, value: string) {
        if(name === "name") setUser({...user, id: user.id+1, name: value});
        else setUser({...user, id: user.id+1, address: value});
    }
    return (
        <>
        <h1>This is the parent component</h1>
        <UserContext.Provider value={user}>
            <input type="text" name="name" onChange={(e)=>changeUser(e.target.name, e.target.value)} />
            <input type="text" name="address" onChange={(e)=>changeUser(e.target.name, e.target.value)} />
            { children }
        </UserContext.Provider>
        </>
    )
}