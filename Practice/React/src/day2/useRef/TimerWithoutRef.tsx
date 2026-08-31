export default function TimerWithoutRef() {
    let timerId: number;
    function startTimer() {
        timerId = window.setTimeout(() => {
            console.log("Done");
        }, 1000);
        setTimeout(()=>{
            console.log(timerId);
        }, 2000);
    }
    return (
        <button onClick={startTimer}>Start timer</button>
    )
}