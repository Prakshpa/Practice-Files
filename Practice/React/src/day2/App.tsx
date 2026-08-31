import DOM_useRef from './useRef/DOM_useRef';
import TimerWithoutRef from './useRef/RefWithTimer';
import RefTimer from './useRef/RefWithInterval';
import MutableValueRef from './useRef/MutableValueRef';
import ForwardRef from './forwardRef/ForwardRef';
import CleanUp from './useEffect/CleanUp';
import AsyncLogic from './useEffect/AsyncLogic';
import ParentContext from './useContext/ParentContext';
import ChildContext from './useContext/ChildContext';
import DecendentContext from './useContext/DecendentContext';
import CustomHook from './useContext/CustomHook';
import UsingCustomHook from './useContext/UsingCustomHook';
import type{ User, Product } from './types/types';
// import GenericTable from './GenericComponents/genericTable/GenericTable';
// import List from './GenericComponents/genericList/List';
import GenericForwardRef from './GenericComponents/GenericForwardRef';
import Counter from './useReducer/DemoReducer';
import {useEffect, useRef, } from "react";
import { useFetch } from './exercise/useFetch';

function App() {
    const {data, fetchData} = useFetch<Product>("https://fakestoreapi.com/products");
    const ref = useRef<HTMLOListElement>(undefined);
    useEffect(()=>{
        if(data.state==="success" && ref.current!==null && ref.current!==undefined) {
            ref.current.style.display="block";
        }
    }, [data.state])
    return (
    <>
    <DOM_useRef />

    <MutableValueRef />

    <TimerWithoutRef />

    <RefTimer />

    <ForwardRef />

    <CleanUp />
    
    <Counter />

    <AsyncLogic />

    <ParentContext>
        <ChildContext>
            <DecendentContext />
        </ChildContext>
    </ParentContext>

    <CustomHook>
        <UsingCustomHook />
    </CustomHook>

    {data.state==="loading" && <p>Loading...</p>}
    {data.state==="error" && <p>Error: {data.error}</p>}
    {/* data.state==="success" && <GenericTable<User> data={data.data} columns={[
        {key:"id" as keyof User, header: "ID"},
        {key:"username" as keyof User, header: "UserName"},
        {key:"name" as keyof User, header: "Full Name"},
        {key:"email" as keyof User, header: "Email"},
        {key:"phone" as keyof User, header: "Phone"},
    ]}/> */} <br /><br />

    {data.state === "success" && <GenericForwardRef ref={ref} data={data.data} renderItem={(data:Product)=>(
        <div>
            <span>{data.id}. </span>
            <strong>{data.title}</strong>
            <p>Price: {data.price}</p>
        </div>
    )} />}

    <button onClick={fetchData}>Fetch Data</button>
    </>
    );
}
export default App;