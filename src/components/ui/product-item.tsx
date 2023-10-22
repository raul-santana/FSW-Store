import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
    product: ProductWithTotalPrice
}

const ProductItem = ({product}: ProductItemProps) => {
    return ( 
        <Link href={`/product/${product.slug}`}>
            <div className="flex flex-col gap-4">
                <div className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
                    <Image 
                        src={product.imageUrls[0]}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-[90px] max-h-[70%] w-auto max-w-[80%]"
                        style={{
                            objectFit: "contain",
                        }}
                        alt={product.name}
                    />

                    {product.discountPercentage > 0 && (
                        <DiscountBadge className="absolute left-3 top-3">
                            {product.discountPercentage}%
                        </DiscountBadge>
                    )}
                </div>


                <div>
                    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                        {product.name}
                    </p>

                    <div className="flex items-end gap-2">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="font-semibold text-sm">
                                    R$ {product.totalPrice.toFixed(2)}
                                </p>

                                <p className="text-xs opacity-60 line-through">
                                    R${Number(product.basePrice).toFixed(2)}
                                </p>
                            </>
                        ) : (
                            <p className="font-semibold text-sm">
                            R${Number(product.basePrice).toFixed(2)}
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </Link>
     );
}
 
export default ProductItem;