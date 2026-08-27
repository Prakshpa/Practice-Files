interface TableRow <T extends {}> {
    data: T
}
export default function GenericRow<T extends {}>({  data }: TableRow<T>) {
    const cols = Object.values(data);
    return (
        <tr>
            {cols.map(value=>{
                return <td>{value as string | number}</td>
            })}
        </tr>
    )
}