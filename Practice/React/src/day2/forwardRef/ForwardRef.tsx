import { forwardRef, useRef } from "react";
import TypedRef,{type CustomRef } from "./TypedRef";

function ForwardRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const customRef = useRef<CustomRef>(null);
  function changeView(){
    customRef.current?.open()
  }

  return (
    <>
      <Input ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>

      <br /><br />

      <TypedRef ref={customRef} title="Custom ref Type" />
      <button onClick={changeView}>Click to set open</button>
    </>
  );
}


type InputProps = {
  placeholder?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder }, ref) => {
    return (
    <input ref={ref} placeholder={placeholder} />
    );
  }
);

Input.displayName = "InputField";

export default ForwardRef;