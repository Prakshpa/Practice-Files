import { useContext } from "react";
import { UserContext } from "./ParentContext";

export default function DecendentContext() {
    const user = useContext(UserContext);
    return (
        <>
        <h3>This is a decendent component</h3>
        <p>User: {JSON.stringify(user as Object)}</p>
        </>
    )
}