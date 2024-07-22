"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useParams } from "next/navigation"
import axios from "@/lib/axios"
import { IProduct } from "@/types/interfaces"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useCurrentToken } from "@/hooks/use-current-token"
import Loader from "@/components/Loader"
import useCartStore from "@/store/cart"


export default function Component() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<IProduct>({} as IProduct);
    const params = useParams<{id: string}>()
    const token = useCurrentToken();
    const {addToCart} = useCartStore() 
    useEffect(() => {
        if (!token) {
          setIsLoading(false);
          return;
        }
    
        fetchProductData();
      }, [token, params.id]);
    
      const fetchProductData = async () => {
        try {
          const response = await axios.get<IProduct>(`product/v1/${params.id}`, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };

      if(isLoading){
        return <Loader/>
      }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-24 min-h-[calc(100dvh-16rem)] my-24">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Left column */}
        <div className="flex flex-col-reverse">
          <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {[data.image1, data.image2, data.image3].filter(Boolean).map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        {/* Right column */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{data.name}</h1>
          
          <div className="mt-3 flex items-center justify-between">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl font-bold text-gray-900">${data.price}</p>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`${
                      rating < 4 ? 'text-yellow-400' : 'text-gray-300'
                    } h-5 w-5 flex-shrink-0`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">(4.0 / 5) · 125 reviews</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700">{data.description}</p>
          </div>

          <div className="mt-6 flex items-center">
            <TruckIcon className="h-5 w-5 text-green-500" />
            <p className="ml-2 text-sm text-gray-500">Free shipping</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
            <Button size="lg" className="flex-1 text-white" onClick={() => {
              toast.success("Product added to cart")
              addToCart(data)
            }}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="mt-4 sm:mt-0 flex-1">
              Book Now
            </Button>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-900">Fabric & Care</h3>
            <p className="mt-2 text-sm text-gray-500">
              60% combed ringspun cotton/40% polyester jersey tee.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ... (StarIcon, TruckIcon, UserIcon, and XIcon components remain the same)

function StarIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function TruckIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}


function UserIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}