
import Image from "next/image"
import Categories from "./(home)/components/categories"
import ProductList from "./(home)/components/product-list"
import { prismaClient } from "@/lib/prisma"

export default async function Home() {

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage:{
        gt: 0,
      }
    }
  })

  return (
    <div>
      <Image 
        src={"/banner-home-01.png"}
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="até 55% de desconto esse mês"
      />

      <div className="mt-8 px-5">
        <Categories />  
      </div>

      <div className="mt-8">
        <p className="font-bold uppercase pl-5 mb-3">Ofertas</p>
        <ProductList products={deals} />
      </div>

      <Image 
        src={"/banner-home-02.png"}
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="até 55% de desconto em mouses"
      />

    </div>
  )
}
