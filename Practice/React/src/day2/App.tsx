import DOM_useRef from './useRef/DOM_useRef';
import TimerWithoutRef from './useRef/TimerWithoutRef';
import RefTimer from './useRef/RefTimer';
import MutableValueRef from './useRef/MutableValueRef';
function App() {
    return (
    <>
    <DOM_useRef />

    <MutableValueRef />

    <TimerWithoutRef />

    <RefTimer />
    
    </>
    );
}
export default App;