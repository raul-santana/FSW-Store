"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
    product: ProductWithTotalPrice;
}

const ProductInfo = ({product}: ProductInfoProps) => {

    const [quantity, setQuantity] = useState(1)

    const {addProductToCart, products} = useContext(CartContext)

    const handleDecreaseQuantityClick = () => {
        setQuantity((prev) => prev === 1 ? prev : prev - 1)
    }

    const handleIncreaseQuantityClick = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleAddToCartClick = () => {
        addProductToCart({...product, quantity})
        console.log(products)
    }

    return ( 
        <div className="flex flex-col px-5">
            <h2 className="text-lg"> {product.name} </h2>

            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold"> R${product.totalPrice.toFixed(2)} </h1>
                {product.discountPercentage > 0 && (
                    <DiscountBadge>
                        {product.discountPercentage}%
                    </DiscountBadge>
                )}
            </div>

            {product.discountPercentage > 0 && (
                <p className="opacity-75 text-sm line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
            )}

            <div className="mt-4 flex items-center gap-2">
                <Button size="icon" variant={"outline"} onClick={handleDecreaseQuantityClick}>
                    <ArrowLeftIcon size={16}/>
                </Button>

                <span>{quantity}</span>

                <Button size="icon" variant={"outline"} onClick={handleIncreaseQuantityClick}>
                    <ArrowRightIcon size={16} />
                </Button>
            </div>

            <div className="flex flex-col gap-3 mt-8">
                <h3 className="font-bold">Descrição</h3>
                <p className="text-sm opacity-60 text-justify">{product.description}</p>
            </div>

            <Button className="mt-8 uppercase font-bold" onClick={handleAddToCartClick}>
                Adicionar ao carrinho
            </Button>

            <div className="mt-5 bg-[#2a2a2a] rounded-lg flex justify-between items-center px-5 py-4">
                <div className="flex items-center gap-3">
                    <TruckIcon />

                    <div className="flex flex-col">
                        <p className="text-xs">
                            Entrega via <span className="font-bold">FSPacket®</span>
                        </p>
                        <p className="text-[#8162FF] text-xs">
                            Envio para todo <span className="font-bold">Brasil</span>
                        </p>
                    </div>
                </div>

                <p className="text-xs font-bold">Frete grátis</p>
            </div>
        </div>
     );
}
 
export default ProductInfo;