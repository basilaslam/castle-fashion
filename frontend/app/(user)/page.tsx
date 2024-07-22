import Hero from "@/components/Hero";
import Newest from "@/components/Newels";
import Image from "next/image";

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Castle Fashion | Trendsetting Apparel and Accessories',
  description: 'Discover the latest in fashion at Castle Fashion. Shop our curated collection of trendsetting apparel and accessories for men and women.',
  keywords: 'fashion, clothing, accessories, trendsetting, apparel, Castle Fashion',
  openGraph: {
    title: 'Castle Fashion | Trendsetting Apparel and Accessories',
    description: 'Discover the latest in fashion at Castle Fashion. Shop our curated collection of trendsetting apparel and accessories for men and women.',
    url: 'https://www.castlefashion.com',
    siteName: 'Castle Fashion',
    images: [
      {
        url: 'https://www.castlefashion.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Castle Fashion Homepage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Castle Fashion | Trendsetting Apparel and Accessories',
    description: 'Discover the latest in fashion at Castle Fashion. Shop our curated collection of trendsetting apparel and accessories for men and women.',
    images: ['https://www.castlefashion.com/twitter-image.jpg'],
    creator: '@castlefashion',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.castlefashion.com',
    languages: {
      'en-US': 'https://www.castlefashion.com',
      'es-ES': 'https://www.castlefashion.com/es',
    },
  },
}

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
    </div>
  );
}
