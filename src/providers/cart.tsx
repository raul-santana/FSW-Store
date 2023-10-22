"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
    quantity: number;
}

interface ICardContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number; // no discount
    cartTotalDiscount: number;
}

const CartContext = createContext<ICardContext>({
    products:[],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
})

const CartProvider = ({ children }: { children: ReactNode}) => {
    return ( 

        <CartContext.Provider
            value={{
                products:[],
                cartTotalPrice: 0,
                cartBasePrice: 0,
                cartTotalDiscount: 0,
            }}
        >
            {children}
        </CartContext.Provider>

     );
}
 
export default CartProvider;