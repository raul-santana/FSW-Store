
import Image from "next/image"
import Categories from "./(home)/components/categories"
import ProductList from "./(home)/components/product-list"
import { prismaClient } from "@/lib/prisma"
import SectionTitle from "./(home)/components/section-title"
import PromoBanner from "./(home)/components/promo-banner"

export default async function Home() {

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage:{
        gt: 0,
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      }
    }
  })

  return (
    <div>
      <PromoBanner 
        src={"/banner-home-01.png"}
        alt="até 55% de desconto esse mês"
      />

      <div className="mt-8 px-5">
        <Categories />  
      </div>

      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner 
        src={"/banner-home-02.png"}
        alt="até 55% de desconto em mouses"
      />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

    </div>
  )
}
