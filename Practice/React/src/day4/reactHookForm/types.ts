import type { ReactElement } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

export type FormValues = {
    name: string,
    email: string,
    age: number,
    address: {
        city: string,
        street: string
    },
    hobbies: string[],
    phone: {value:string}[],
    description: string,
    birthDate: string
}
export interface FormFieldProp<T extends FieldValues> {
    name: FieldPath<T>,
    control: Control<T>,
    render: ReactElement,
    rules: Object
}
export type ControlledRowProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  children: (
    field: React.ComponentProps<"input">,
    fieldState: {
      error?: {
        message?: string;
      };
    }
  ) => React.ReactNode;
};