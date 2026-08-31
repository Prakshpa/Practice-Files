import { useContext } from "react";
import { UserHook } from "./CustomHook";
export default function UsingCustomHook() {
    function useMyContext() {
        const user = useContext(UserHook);
        if(user === undefined) throw new Error("To use Context value, declare this component inside Context.Provider");
        return user;
    }
    const {user, setUser} = useMyContext();

    function setUserId() {
        if(user !== null) {
            setUser({...user, id: Math.round(Math.random()*100) });
        }else{
            setUser({id: 0, name: "", address:""});
        }
    }
    return (
        <>
        <p>ID: {user?.id}, Name: {user?.name}, Address: {user?.address}</p>
        <button onClick={setUserId}>Change Id</button>
        </>
    )
}