import type { Ref, SubmitEvent } from "react"

export default function SearchBar({changeInput,ref, searchHandle}:{
    ref: Ref<HTMLInputElement>,
    searchHandle: (e: SubmitEvent)=>void,
    changeInput: (value:string)=>void
}) {
    return (
        <form onSubmit={searchHandle} >
            <input type="search" ref={ref} onChange={(e)=>changeInput(e.target.value)} />
            <input type="submit" value="Search" />
        </form>
    )
}