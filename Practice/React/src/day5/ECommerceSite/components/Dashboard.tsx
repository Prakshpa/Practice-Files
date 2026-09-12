import { useContext } from "react";
import { Context } from "../LayoutProvider";
import List from "../../../day2/GenericComponents/genericList/List";
import type { ProductType } from "../types";

export default function Dashboard(){
    const {products, addToCart} = useContext(Context);
    return (
        <>
            <h1 className="text-2xl font-bold text-blue-600 my-5 text-center">Product Dashboard</h1>
            {products.length>0? <List<ProductType> data={products} renderItem={(product)=>(
                <div className="inline-block items-center bg-green-100 border-1 text-green-900 max-h-100 max-w-100">
                    {product.image? <img src={product.image} className="h-50 w-auto " alt="Product Image" /> :
                        <img height={50} width={40} src="noImage.jpg" alt="Product Image" /> }
                    <p className="text-xl font-bold text-blue-400">{product.title}</p>
                    <p> {product.category} </p>
                    <p className="flex justify-around my-2">
                        <span> $ {product.price} </span>
                        <span> Rating: {product.rating.rate} </span>
                    </p>
                    <button className="text-lg bg-green-500 border-1 text-white px-5 m-2 py-1 rounded-xl" onClick={()=>addToCart(product)}>
                        + Cart
                    </button>
                </div>
            )} /> : <p>Fetching: </p> }

        </>
    );
}