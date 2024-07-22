
import { getCurrentToken } from "@/lib/auth";
import { IProduct } from "@/types/interfaces";
import axios from "@/lib/axios";

import ProductCard from "@/components/ProductCard";

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Shop All Products | Castle Fashion',
    description: 'Explore our wide range of trendsetting apparel and accessories. Find the latest fashion trends at Castle Fashion.',
    openGraph: {
      title: 'Shop All Products | Castle Fashion',
      description: 'Explore our wide range of trendsetting apparel and accessories. Find the latest fashion trends at Castle Fashion.',
      url: 'https://www.castlefashion.com/products',
      siteName: 'Castle Fashion',
      images: [
        {
          url: 'https://www.castlefashion.com/products-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Castle Fashion Products',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    alternates: {
      canonical: 'https://www.castlefashion.com/products',
    },
  }
}

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = searchParams.query as string | undefined;

  const { data } = await axios.get<IProduct[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/v1`,
    {
      headers: {
        Authorization: `Bearer ${await getCurrentToken()}`,
      },
    }
  );

  // Filter products based on the query
  const filteredProducts = query
    ? data.filter(product => 
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
    : data;

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100dvh-10rem)]">
      {query && (
        <h2 className="text-2xl font-bold mb-6">
          Search results for: {query}
        </h2>
      )}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}