export default function Input({name, type, label, onChange, fieldState}:{
    name:string, 
    label:string, 
    onChange: ()=>void,
    fieldState: {
      error?: {
        message?: string;
      };
    },
    type:string
}) {
    return (
        <div className="mt-5 flex">
            <label htmlFor={name} className="mx-5 font-bold inline-block w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">{label}</label>
            <div>
                <input type={type} id={name} onChange={onChange} className="px-2 py-1 w-100 bg-green-200 border-b-blue-500 sm:w-80 border-l-blue-500 border border-amber-100" />
                <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
            </div>
        </div>
    )
}