import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from "../LayoutProvider"

export default function NavBar(){
    const { cart } = useContext(Context);
    return (
        <nav className="flex flex-row bg-blue-100 h-10 justify-around items-center sticky transparent">
            <NavLink to="/dashboard" className={({isActive})=>(isActive? "bg-yellow-500 text-brown-400 underline":"mx-2 py-2 px-4")}>
                Dashboard
            </NavLink>
            <div className="flex justify-center">
                <NavLink to="/products" className="sm:mx-2 mr-10"> Products </NavLink>
                <NavLink to="/cart" className="mx-2 absolute top-1 right-[1%] lg:right-[15%] md:right-[10%] sm:right-[5%] p-[4px]">
                    <svg className="" fill="none" height="27" viewBox="0 0 30 27" width="30" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39999 1.70001H6.60001" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                        <path d="M6.60001 1.70001L11 18.9" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                        <path d="M11.8 18.9H28.3" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                        <path d="M13.8 25.7C15.4569 25.7 16.8 24.3569 16.8 22.7C16.8 21.0432 15.4569 19.7 13.8 19.7C12.1431 19.7 10.8 21.0432 10.8 22.7C10.8 24.3569 12.1431 25.7 13.8 25.7Z" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                        <path d="M25.3 25.7C26.9568 25.7 28.3 24.3569 28.3 22.7C28.3 21.0432 26.9568 19.7 25.3 19.7C23.6431 19.7 22.3 21.0432 22.3 22.7C22.3 24.3569 23.6431 25.7 25.3 25.7Z" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                        <path d="M25.7 14.6H11.3C10.7 14.6 10.1 14.2 10 13.6L8.1 6.90001C7.9 6.00001 8.49999 5.20001 9.39999 5.20001H27.5C28.4 5.20001 29.1 6.10001 28.8 6.90001L26.9 13.6C26.9 14.2 26.4 14.6 25.7 14.6Z" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                    </svg>
                    {cart.length>0 && <span className="rounded-full border-1 text-[8px] w-5 text-center bg-orange-500 text-white absolute top-0 right-0 p-[4px]">
                        {cart.reduce((count: number, product)=>{
                            count+=product.quantity;
                            console.log(count);
                            return count;
                        }, 0)}
                    </span> }
                </NavLink>
            </div>
        </nav>
    )
}