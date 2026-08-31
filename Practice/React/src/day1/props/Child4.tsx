interface ObjectProps {
    id: string,
    name: string,
    message: string
}
export default function Child4({prop}: {prop: ObjectProps}) {
    return (
        <>
        <p>{prop.id}</p>
        <p>{prop.name}</p>
        <p>{prop.message}</p>
        </>
    );
}