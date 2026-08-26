import './App.css';
import {Child} from './Child'
import Child2 from './Child2';
import Child3 from "./Child3";
import Child4 from './Child4';

function App() {
  function write(message: string): void {
    document.write(message);
  }

  return (
    <>
      <h1>Hello world</h1>
      <Child key={1} data={{id: "abcd", name: "Test Key", title: "Hello World"}} />

      <Child2 name='With Description: ' description='Here is the description'/><br />
      <Child2 name='Without Description: '/>

      <Child3 prop = {["Prakash", "Ranjan", "Lokendra"]} />

      <Child4 prop={{id: "abc123", name: "Test object", message: "Check Object props"}} />

    </>
  )
}

export default App
