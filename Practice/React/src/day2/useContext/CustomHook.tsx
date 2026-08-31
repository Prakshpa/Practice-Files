import type React from "react";
import { type User } from "./ParentContext";
import { createContext, useState } from "react";
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserHook = createContext<UserContextType | undefined>(undefined)

export default function CustomHook({children}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | null>({id: 0, name: "", address: "Kathmandu"});
    function changeUser(name:string, value: string) {
        if(name === "name") {
            setUser(prev=>{
                if(prev!==null) return {...prev, id: prev.id+1, name: value}
                else return {id: 1, name: value, address: ""}
            });
        }else {
            setUser(prev=>{
                if(prev!==null) return {...prev, id: prev.id+1, address: value}
                else return {id: 1, name: "", address: value}
            });
        }
    }
    return (
        <>
        <h1>This is the parent component</h1>
        <UserHook.Provider value={ {user, setUser} }>
            <input type="text" name="name" onChange={(e)=>changeUser(e.target.name, e.target.value)} />
            <input type="text" name="address" onChange={(e)=>changeUser(e.target.name, e.target.value)} />
            
            { children }
        </UserHook.Provider>
        </>
    );
        
}
