import { useForm, type Resolver, useFieldArray, Controller, type FieldErrors } from "react-hook-form"
import type { FormValues } from "./types"
import axios from "axios";
import Input from "./Input";

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export default function ReactHookForm() {
    const formResolver: Resolver<FormValues> = async (values) => {
        const errors:FieldErrors<FormValues> = {};
        if(values.phone.length===0) {
            errors.phone = {
                type: "required",
                message: "Enter at least one phone no"
            }
        }else if(values.phone.length===1) {
            console.log(values.phone);
            const number = Number.parseInt(values.phone[values.phone.length-1].value);
            console.log(number);
            if(Number.isNaN(number)){
                errors.phone = {
                    type: "required",
                    message: "Phone number required"
                }
            }else if(number<=9700000000){
                errors.phone = {
                    type: "min",
                    message:"Phone number should be greater than 9700000000"
                }
            }else if(number>=9900000000) {
                errors.phone = {
                    type: "max",
                    message: "Phone should be less than 9900000000"
                }
            }
        }
        return {
            values: Object.values(errors).length===0? values:{},
            errors
        }
    }
    const { handleSubmit, control, reset, getValues, setValue, formState:{errors, isSubmitting, isSubmitSuccessful}, register} = useForm<FormValues>({
        defaultValues: {
            name: "Prakash",
            age: 22,
            email:"abc@abc.abc",
            address:{},
            hobbies: [],
            phone: []
        },
        resolver: formResolver,
        mode: "onChange"
    });
    const phone = useFieldArray<FormValues, "phone">({
        control,
        name:"phone"
    });
    if(isSubmitting) return <p>Wait while form is submitting</p>
    else if(isSubmitSuccessful) return <p>Successfully Submitted</p>
    else return (
        <main className="flex w-full h-full text-lg content-around justify-around">
        <form onSubmit={handleSubmit(async data=>{
            console.log(data);
            await axios.post("https://jsonplaceholder.typicode.com/users", data);
            alert("Submitted successfully");
            reset();
        },(errors)=>console.log(errors)
        )} className=" w-200 md:w-150 sm:w-120 sm:m-0 sm:mx-0 rounded-xl bg-blue-400 my-5">
            <h2 className="font-bold text-2xl text-center bg-green-200 text-amber-800 py-10 ">Registration Form</h2>
            <Controller
                name="name"
                control={control}
                rules={{
                    required: "Full Name is Required",
                    pattern: {
                        value: /^([a-z]+ )+[a-z]+$/i,
                        message: "Invalid Name format"
                    },
                    minLength: {
                        value: 8,
                        message: "Full Name must be at least 8 characters long"
                    }}
                }
                render= {({field, fieldState})=>(
                    <Input label="Name" name="name" fieldState={fieldState} onChange={field.onChange} />
                )}
            />
            <Controller
                name="description"
                control={control}
                rules={{required:"This field is required"}}
                render={({field, fieldState})=>(
                    <Input label="Description" name="name" fieldState={fieldState} onChange={field.onChange} />
                )} 
            />
            <div className="flex mt-5">
                <label htmlFor="birthDate" className="mx-5 font-bold inline-block w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Date of Birth</label>
                <div>
                    <input type="date" id="birthDate" {...register("birthDate", {
                        required: "Enter your date of birth",
                        valueAsDate: true,

                    })} className="px-2 py-1 w-100 bg-green-200 border-b-blue-500 sm:w-80 border-l-blue-500 border border-amber-100" />
                    <p className="text-red-500 text-sm">{errors.birthDate?.message}</p>
                </div>
            </div>
            <Controller
                name="email"
                control={control}
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^[a-z]+[a-z0-9]*(.[a-z0-9])*@[a-z]+((.)+[a-z]+)+$/i,
                        message: "Invalid email"
                    },
                    min: 5
                }}
                render={({field, fieldState})=>( 
                    <Input label="E mail" name="email" fieldState={fieldState} onChange={field.onChange} />
                )} 
            />
            <div className="flex mt-5">
                <label htmlFor="age" className="mx-5 font-bold inline-block w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Age</label>
                <div>
                    <input type="number" className="px-2 py-1 w-100 bg-green-200 border-b-blue-500 border-l-blue-500 border border-amber-100 sm:w-80" {...register("age", {
                        required: "Age is Required",
                        onChange: (e)=>{
                            if(e.target.value.length>=3) {
                                setValue("age", Number(e.target.value)%100);
                                console.log(getValues("age"));
                                console.log("Changed input");
                            }else {
                                console.log(1+e.target.value);
                                setValue("age", e.target.value);
                            }
                        },
                        min: {
                            value: 1,
                            message: "Age can't be negative or 0"
                        },
                        valueAsNumber: true,
                        max: {
                            value:100,
                            message: "Max age is 100"
                        }
                    })} />
                    <p className="text-red-500 text-sm">{errors.age?.message}</p>
                </div>
            </div>
            <div className="mt-5 flex">
                <label htmlFor="address" className="mx-5 font-bold inline-block w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Address</label>
                <div className="flex flex-wrap">
                    <input type="text" placeholder="City" className="px-2 mr-5 py-1 w-50 sm:w-35 mb-1 sm:mr-2 bg-green-200 border-b-blue-500 border-l-blue-500 border border-amber-100 " {...register("address.city", {
                        required: "City is Required"
                    })} />
                    <p className="text-red-500 text-sm">{errors.address?.city?.message}</p>
                    <input type="text" placeholder="Street" className="px-2 py-1 mb-1 w-50 sm:w-35 bg-green-200 border-b-blue-500 border-l-blue-500 border border-amber-100 " {...register("address.street", {
                        required: "Enter City street"
                    })} />
                    <p className="text-red-500 text-sm">{errors.address?.street?.message}</p>
                </div>
            </div>
            <div className="flex">
                <label htmlFor="hobbies" className="mx-5 font-bold inline-block middle w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Hobbies</label>
                <div className="flex flex-col">                    
                    <div className="flex flex-wrap">
                        <div className="flex mb-2">
                            <label>
                                <input type="checkbox" value="playing" {...register(`hobbies`)} 
                                    className="border-1 bg-white w-4 mx-2 h-4 border-l-blue-700 border-b-blue-700 border-amber-200" />
                                Playing
                            </label>
                            <label>
                                <input type="checkbox" value="reading" {...register(`hobbies`)} 
                                    className="border-1 bg-white w-4 mx-2 h-4 border-l-blue-700 border-b-blue-700 border-amber-200" />
                                Reading
                            </label>
                            <label>
                                <input type="checkbox" value="writing" {...register(`hobbies`)} 
                                    className="border-1 bg-white w-4 mx-2 h-4 border-l-blue-700 border-b-blue-700 border-amber-200" />
                                Writing
                            </label>
                            <label>
                                <input type="checkbox" value="singing" {...register(`hobbies`)} 
                                    className="border-1 bg-white w-4 mx-2 h-4 border-l-blue-700 border-b-blue-700 border-amber-200" />
                                Singing
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <label htmlFor="phone" className="mx-5 font-bold inline-block middle w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Phone</label>
                <div className="flex flex-col">
                    {phone.fields.map((value, index)=>{
                        return (<div key={value.id}>
                            <span>#{index+1}#</span>
                                {(phone.fields.length-1 === index)? (
                                    <input type="number" {...register(`phone.${index}.value`)} placeholder="98XXXXXXXX"
                                    className="border-1 bg-white px-2 border-l-blue-800 border-b-blue-800 border-amber-200" />
                                    ) : <span className="bg-white mx-2 px-2 py-1">{value.value}</span>
                                }
                                <button type="button" className="bg-red-600 mx-2 px-3 pt-1 pb-2 font-bold text-blue-100 border-1 rounded-lg mb-2" onClick={()=>{
                                    phone.remove(index);
                                }}>Delete</button>
                            </div>)
                        }
                    )}
                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                    <button type="button" className="bg-green-600 mx-2 px-3 pt-1 pb-2 font-bold text-blue-100 border-1 rounded-lg mb-2" onClick={()=>{
                        const lastIndex = phone.fields.length-1;
                        const phoneNo = Number.parseInt(phone.fields[lastIndex]?.value);
                        if(!Number.isNaN(phone) && phoneNo>9700000000 && phoneNo<9900000000 || phone.fields.length===0){
                            phone.append({
                                value: ""
                            });
                        }else console.log(phoneNo);
                    }}>Append</button>
                </div>
            </div>
            <div>
                <div className="">
                    <p className="flex flex-row p-10 w-full justify-around bg-gray-300">
                        <input type="submit" className="px-3 py-1 text-orange-300 bg-green-700" value="Submit form" />
                        <input type="reset" onClick={(e)=>{
                            e.preventDefault();
                        reset({
                            name: "", age: 0, email:"", address:{city:"", street:""}, 
                            birthDate: formatDate(new Date(Date.now())), description:"", hobbies:[], phone:[]
                        },{keepErrors:false})
                        }} className="px-3 py-1 text-blue-200 bg-red-500" value="Reset form" />
                    </p>
                </div>
            </div>
        </form>
    </main>
    )
}