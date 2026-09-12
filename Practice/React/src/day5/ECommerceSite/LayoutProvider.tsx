import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';
import { createContext, useEffect, useReducer } from 'react';
import { Action, Product, ProductContext as ZodProductContext } from './types';
import type z from 'zod';
import { useFetch } from '../../day2/customHooks/Parameters';

type ProductInterface = z.infer<typeof Product>;

type ProductContext = z.infer<typeof ZodProductContext> & {
    addProduct: (value: ProductInterface) => Promise<void>
    addToCart: (value: ProductInterface) => void
}

const ProductDataSchema = ZodProductContext.pick({
    products: true,
    cart: true
});
type ProductData = z.infer<typeof ProductDataSchema>;

export const Context = createContext<ProductContext>({
    products : [],
    cart: [],
    addProduct: async ()=>{return},
    addToCart: ()=>{return}
});
export default function LayoutProvider() {
    function reducer(state: ProductData, action:z.infer<typeof Action>) {
        switch(action.type){
            case "add product":
                return {...state, products: [...state.products, action.data]};
            case "add to cart":
                const cart = state.cart;
                const findIndex = cart.findIndex(value=>value.id===action.data.id);
                if(findIndex>=0) {
                    const data = cart[findIndex];
                    console.log("Testing: "+data.quantity)
                    data.quantity++;
                    cart.splice(findIndex, 1, data);
                }else {
                    cart.push({
                        id: action.data.id,
                        title: action.data.title,
                        quantity: 1,
                        price: action.data.price,
                        image: action.data.image
                    })
                }
                return {...state, cart};
            case "delete product":
                const products = state.products;
                const deleteIndex = products.findIndex(product=>product.id===action.id);
                products.splice(deleteIndex, 1);
                return {...state, products};
            case "fetch products":
                return {...state, products:action.data}
            default: return state;
        }
    }

    const [productState, dispatch] = useReducer(reducer,{
        products:[],
        cart: []
    });
    const {data, loading, error} = useFetch<ProductInterface>("https://fakestoreapi.com/products");
    
    useEffect(()=>{
        if (!loading && error==="" && data!==undefined) {
            dispatch({type: "fetch products", data});
        } else dispatch({type: "fetch products", data: []});
    }, [data])

    return (
        <Context.Provider value={{
            ...productState,
            addProduct: async (value)=>{
                dispatch({type: "add product", data: value});
            },
            addToCart: (product)=>{
                dispatch({type: "add to cart", data: product});
            }
        }}>
            <NavBar />
            <Outlet />
        </Context.Provider>
    );
}