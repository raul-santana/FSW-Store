"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
    quantity: number;
}

interface ICardContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number; // no discount
    cartTotalDiscount: number;
    addProductToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICardContext>({
    products:[],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
    addProductToCart: () => {},
})

const CartProvider = ({ children }: { children: ReactNode}) => {

    const [products, setProducts] = useState<CartProduct[]>([])

    const addProductToCart = (product: CartProduct) => {
        setProducts((prev) => [...prev, product])
    }

    return ( 

        <CartContext.Provider
            value={{
                products,
                cartTotalPrice: 0,
                cartBasePrice: 0,
                cartTotalDiscount: 0,
                addProductToCart
            }}
        >
            {children}
        </CartContext.Provider>

     );
}
 
export default CartProvider;