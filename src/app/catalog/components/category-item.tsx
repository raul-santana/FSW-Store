import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: Category
}


const CategoryItem = ({category}: CategoryItemProps) => {

    return (
        <Link href={`category/${category.slug}`} target="_blank">
            <div className="flex flex-col">
                <div className="w-full h-[150px] flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient">
                    <Image 
                        src={category.imageUrl}
                        alt={category.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto max-h-[70%] w-auto max-w-[80%]"
                        style={{
                            objectFit: "contain"
                        }}
                    />
                </div>

                <div className="bg-accent py-3 rounded-br-lg rounded-bl-lg ">
                    <p className="text-center text-sm font-semibold">{category.name}</p>
                </div>
            </div>
        </Link>
     );
}
 
export default CategoryItem;