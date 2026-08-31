import type React from "react"

interface WithOptionalProp {
    name: string,
    description?: string
}
const Child2: React.FC<WithOptionalProp> = (props) => {
    return (
        <>
        {JSON.stringify(props)}
        </>
    )
}
export default Child2;