import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext, useState } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";
import { SheetClose } from "./sheet";

const Cart = () => {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)
  const {data} = useSession()
  const { products, subtotal, total, totalDiscount, cleanCart } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {

    
    if(!data?.user){
      //redirecionar para o login
      alert('Faça o login para realizar uma compra!')
      return;
    }

    setIsCreatingCheckoutSession(true)

    try{
      const order = await createOrder(products, (data.user as any).id)

      const checkout = await createCheckout(products, order.id);
  
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

      if(stripe){

        cleanCart()

        stripe.redirectToCheckout({
          sessionId: checkout.id,
        });
      }
    }catch{
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        variant="heading"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* RENDERIZAR OS PRODUTOS */}
      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Carrinho vazio. Vamos fazer compras?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
            </div>
            
            <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
            disabled={isCreatingCheckoutSession}
            >
              Finalizar compra
            </Button>
            
        </div>
      )}
    </div>
  );
};

export default Cart;