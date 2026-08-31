import type React from "react";
import { useContext } from "react";
import { UserContext } from "./ParentContext";

export default function ChildContext({children}:{
    children: React.ReactNode
}) {
    function getUser() {
        const user = useContext(UserContext);
        if(user===undefined) throw new Error("This component needs to be inside context Provider");
        return user;
    }
    const user = getUser();
    return (
        <>
        <h2>THis is Child Component</h2>
        {user!==undefined && children}
        </>
    )
}