import type React from "react"

export interface PropInterface {
    data: {
        id: string,
        name: string,
        title: string
    },
    key: number
}

export type PropType = {
    data: {
        id: string,
        name: string,
        title: string
    },
    key: number
}

export const Child: React.FC<PropType> = (props) => {
    return(
        <>
            <h2>Hello child</h2>
            <div>{JSON.stringify(props)}</div>
        </>

    )
}