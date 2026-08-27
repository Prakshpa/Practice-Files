export default function Button({onClick}: {onClick: ()=>void}) {
    return (
        <button onClick={onClick}> Click Me </button>
    );
}