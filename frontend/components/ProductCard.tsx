"use client";
import Image from "next/image";

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button";
import { IProduct } from "@/types/interfaces";
import Link from "next/link";
import useCartStore from "@/store/cart";
import { toast } from "sonner";
const ProductCard = ({product}:{product: IProduct}) => {
    const {addToCart} = useCartStore()
    return(
        <Card key={product._id} className="flex flex-col h-full">
            <div className="relative pt-[100%] overflow-hidden">
              <Image
                src={product.image1}
                alt={product.name}
                height={300}
                width={300}
                className="absolute top-0 left-0 w-full h-full object-contain rounded-t-lg"
              />
            </div>
            <CardContent className="p-4 flex-grow flex flex-col">
              <Link 
                className="text-lg font-medium cursor-pointer hover:underline" 
                href={`/products/${product._id}`} 
                prefetch={false}
              >
                <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
              </Link>
              <p className="text-muted-foreground text-sm mt-2 line-clamp-2 flex-grow">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                <Button size="sm" className="px-3 py-2" onClick={()=> {
                  toast.success("Product added to cart")
                  addToCart(product)
                  }}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
    )
}

export default ProductCard