import './App.css';
// import {Child} from './props/Child'
// import Child2 from './props/Child2';
// import Child3 from "./props/Child3";
// import Child4 from './props/Child4';
// import Child5 from './props/Button';
// import SpecialProps from './props/SpecialProps';
// import GenericRow from './others/GenericList';
// import DefaultProps from './props/DefaultProps';
import UseState from './others/UseState';
// import DescriminatingUnion from './others/DiscriminatingUnion';
// import SyntheticEvent from './events/SyncheticEvent';
// import MouseEvent from './events/MouseEvent';
// import ChangeEvent from './events/ChangeEvent';
// import FormEvent from './events/FormEvent';
// import KeyboardEvent from './events/KeyboardEvent';
// import FocusEvent from './events/FocusEvent';

// Generic
// interface User {
//   id: string,
//   name: string,
//   age: number
// }
// interface Product {
//   id: number,
//   productName: string,
//   productDescription: string
// }

function App() {
  // function onClick(): void {
  //   alert("You clicked me");
  // }

  // Generic
  // const users: User[] = [
  //   {id: "abc1", name: "Ram", age: 100},
  //   {id: "abc2", name: "Shyam", age: 20}
  // ];
  // const products: Product[] = [
  //   {id: 1, productName: "Noodles", productDescription: "Tasty and spicy"},
  //   {id: 2, productName: "Sause", productDescription: "Tomato kechup"}
  // ]

  return (
    <>
    {/* <table>
      <caption>Users</caption>
      {users.map(value=>{
        return <GenericRow<User> data={value}/>
      })}
    </table><br /><br />
    <table>
      <caption>Products</caption>
      {products.map(value=>{
        return <GenericRow<Product> data={value} />
      })}
    </table> */}

    {/* <SpecialProps>
      <DefaultProps user= "Prakash" message='Hello World : )' />
      <DefaultProps message='Anyone in there' />
    </SpecialProps> */}

    <UseState />

    {/* <DescriminatingUnion /> */}

    {/* <SyntheticEvent /> */}

    {/* <MouseEvent /> */}

    {/* <ChangeEvent /> */}

    {/* <FormEvent /> */}

    {/* <KeyboardEvent /> */}

    {/* <FocusEvent /> */}

    </>
  );
}

export default App

{/* <h1>Hello world</h1>
<Child key={1} data={{id: "abcd", name: "Test Key", title: "Hello World"}} />

<Child2 name='With Description: ' description='Here is the description'/><br />
<Child2 name='Without Description: '/>

<Child3 prop = {["Prakash", "Ranjan", "Lokendra"]} />

<Child4 prop={{id: "abc123", name: "Test object", message: "Check Object props"}} />

<Child5 onClick={onClick} /> */}