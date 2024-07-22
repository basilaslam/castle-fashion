import Link from "next/link";
import { ArrowRight } from "lucide-react";
import axios from "@/lib/axios";
import { IProduct } from "@/types/interfaces";
import { getCurrentToken } from "@/lib/auth";
import ProductCard from "./ProductCard";




export default async function Newest() {

  let { data } = await axios.get<IProduct[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/v1`,
    {
      headers: {
        Authorization: `Bearer ${await getCurrentToken()}`,
      },
    }
  );
  
  data = data.slice(0, 4)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          <Link className="text-primary flex items-center gap-x-1" href="/products">
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
