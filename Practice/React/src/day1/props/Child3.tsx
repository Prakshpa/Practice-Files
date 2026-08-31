import type React from "react";

const Child3: React.FC<{prop: string[]}> = ({prop}) => {
    return(
        <>Primitive Prop: {prop}</>
    )
}
export default Child3;