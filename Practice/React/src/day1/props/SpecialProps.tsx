import type React from "react"

interface WithChildren {
    children: React.ReactNode
}

export default function SpecialProps({children}: WithChildren){
    return (
        <div style={{display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))"}}>
            {children}
        </div>
    )
}