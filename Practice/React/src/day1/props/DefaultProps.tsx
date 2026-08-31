type PropType = {
    message: string,
    user?: string
}

export default function DefaultProps ({message, user="Anonymous user"}: PropType){
    return (
        <>
        <p>{user} sent a message</p>
        <p>{message}</p>
        </>
    )
}