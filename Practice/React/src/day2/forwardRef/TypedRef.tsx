import { forwardRef, useImperativeHandle, useState } from "react";

export type CustomRef = {
  open: () => void;
  close: () => void;
};

export type propType = {
  title: string;
};

const TypedRef = forwardRef<CustomRef, propType>(
  ({ title }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <div>
        <h2>{title}</h2>

        {open && <p>Opened it</p>}
        {!open && <p>Closed it</p>}
      </div>
    );
  }
);

export default TypedRef;