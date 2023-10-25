import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Package } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

export const dynamic = "force-dynamic";

const OrderPage = async () => {

    const user = getServerSession(authOptions)

    if(!user){
        return <p>Access Denied</p>
    }

    const orders = await prismaClient.order.findMany({
        where: {
            userId: (user as any).id
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        },
        orderBy:{
            updatedAt: "desc"
        }
    })

    return ( 
        <div className="p-5">

            <Badge className="w-fit gap-1 uppercase text-base border-2 border-primary px-3 py-[0.375rem]" variant="outline">
                <Package size={16}/>
                Meus Pedidos
            </Badge>

            <div className="mt-5 flex flex-col gap-5">
                {orders.map(order =>(
                    <OrderItem key={order.id} order={order}/>
                ))}
            </div>

        </div>
     );
}
 
export default OrderPage;