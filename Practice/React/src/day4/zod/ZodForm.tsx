import { useForm, useFieldArray, Controller } from "react-hook-form"
import axios from "axios";
import Input from "../reactHookForm/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function ZodForm(){
    const UserSchema = z.object({
        name: z.string().refine(value=>value.trim()!=="", "Full name required").regex(/^[\s]*[a-z]{2,}( [a-z])+[\s]*$/i, "Fullname must have first and lastname").transform(text=>text.trim()),
        email: z.email({message: "Invalid email"}),
        address: z.object({
            city: z.string().refine(value=>value.trim()!=="", "Enter city name").regex(/^([a-z]+ )*[a-z]+$/i, "Invalid City name format"),
            street: z.string().refine(value=>value.trim()!=="", "Enter street name")
        }),
        birthDate: z.coerce.date().refine((date)=>{
            const year = date.getFullYear();
            if(year<1926 || year >= 2026) return false;
            else return true;
        }, "Invalid date of birth"),
        password: z.string(),
        confirmPassword: z.string(),
        hobbies: z.array(z.enum(["playing", "reading", "writing", "singing"])).nonempty({message: "Select at least one hobby"}),
        phone: z.array(z.object({
            value: z.string().regex(/^(97|98)\d{8}$/, "Enter a valid Phone number")
        })).nonempty({message: "Enter at least one phone number"})
    }).superRefine((data, ctx)=>{
        const password = data.password;
        if(password===""){
            ctx.addIssue({
                code:"custom",
                path: ["password"],
                message:"Password required"
            })
        }else if(password.length<8 || 
            !/[A-Z]+/.test(password) || 
            !/[a-z]+/.test(password) ||
            !/[0-9]+/.test(password) ||
            !/[!@#$%^&*]+/.test(password) ){ 
            ctx.addIssue({
                code: "custom",
                path: ["password"],
                message: "Enter a stronger password"
            })
        }else if(data.password !==data.confirmPassword){
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Passwords don't match"
            })
        }
    })
    type FormInput = z.input<typeof UserSchema>;
    type FormValues = z.infer<typeof UserSchema>;
    const { handleSubmit, control, reset, getValues, formState:{errors}, watch, register} = useForm<FormInput, unknown,FormValues>({
        defaultValues: {
            name: "",
            password: "",
            birthDate: "11-20-203",
            confirmPassword: "",
            email:"",
            address:{city:"", street:""},
            hobbies: [],
            phone: []
        },
        resolver: zodResolver(UserSchema)
    });

    const date = watch(["birthDate", "name"]);
    console.log(date);
    const phone = useFieldArray<FormInput, "phone">({
        control,
        name:"phone"
    });
    return (
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
                render= {({field, fieldState})=>(
                    <Input type="text" label="Name" name="name" fieldState={fieldState} onChange={field.onChange} />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({field, fieldState})=>(
                    <Input type="password" label="Password" name="password" fieldState={fieldState} onChange={field.onChange} />
                )} 
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({field, fieldState})=>(
                    <Input type="password" label="Confirm Password" name="confirmPassword" fieldState={fieldState} onChange={field.onChange} />
                )} 
            />
            <div className="flex mt-5">
                <label htmlFor="birthDate" className="mx-5 font-bold inline-block w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Date of Birth</label>
                <div>
                    <input type="date" {...register("birthDate")}
                     className="px-2 py-1 w-100 bg-green-200 border-b-blue-500 sm:w-80 border-l-blue-500 border border-amber-100" />
                    <p className="text-red-500 text-sm">{errors.birthDate?.message}</p>
                </div>
            </div>
            <Controller
                name="email"
                control={control}
                render={({field, fieldState})=>( 
                    <Input type="email" label="E mail" name="email" fieldState={fieldState} onChange={field.onChange} />
                )} 
            />
            <div className="mt-5 flex">
                <label htmlFor="address" className="mx-5 font-bold inline-block w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Address</label>
                <div className="flex flex-wrap">
                    <span className="mb-1 mr-2">
                        <input type="text" placeholder="City" className="px-2 py-1 w-45 sm:w-35 sm:mr-2 bg-green-200 border-b-blue-500 border-l-blue-500 border border-amber-100 " {...register("address.city")} />
                        <p className="text-red-500 text-sm">{errors.address?.city?.message}</p>
                    </span>
                    <span className="mb-1">
                        <input type="text" placeholder="Street" className="px-2 py-1 w-50 sm:w-35 bg-green-200 border-b-blue-500 border-l-blue-500 border border-amber-100 " {...register("address.street")} />
                        <p className="text-red-500 text-sm">{errors.address?.street?.message}</p>
                    </span>
                </div>
            </div>
            <div className="flex my-2">
                <label htmlFor="hobbies" className="mx-5 font-bold inline-block middle w-22 sm:font-normal lg:ml-10 lg:font-bold sm:overflow-x-wrap sm:mx-1 lg:min-w-30">Hobbies</label>
                <div className="flex flex-col">                    
                    <div className="flex flex-wrap">
                        <div className="flex">
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
                    {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies.message}</p>}
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
                                className="border-1 bg-white px-2 border-l-blue-800 border-b-blue-800 border-amber-200 mt-1" />
                                ) : <span className="bg-white mx-2 px-2 py-1">{value.value}</span>
                            }
                            <button type="button" className="bg-red-600 mx-2 px-3 text-sm pt-1 pb-2 font-bold text-blue-100 border-1 rounded-lg" onClick={()=>{
                                phone.remove(index);
                            }}>Delete</button>
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone[index]?.value?.message}</p>}
                        </div>)
                    })}
                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                    <button type="button" className="bg-green-600 mx-2 px-3 pt-1 pb-2 font-bold text-blue-100 border-1 rounded-lg mb-2" onClick={()=>{
                        const numbers = getValues("phone");
                        
                        const phoneNo = Number.parseInt(numbers[numbers.length-1]?.value);
                        if(!Number.isNaN(phone) && phoneNo>9700000000 && phoneNo<9900000000 || phone.fields.length===0){
                            phone.append({
                                value: ""
                            });
                        }
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
                            name: "", password: "", confirmPassword:"", email:"",
                            address:{city:"", street:""}, birthDate: "", hobbies:[], phone:[]
                        },{keepErrors:false})
                        }} className="px-3 py-1 text-blue-200 bg-red-500" value="Reset form" />
                    </p>
                </div>
            </div>
        </form>
    </main>
    )
}