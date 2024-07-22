"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import useCartStore from "@/store/cart";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

const links = [
  { name: "Home", href: "/" },
  { name: "All", href: "/products" },
  { name: "Hoodies", href: "/products?query=hoodies" },
  { name: "T-shirts", href: "/products?query=tshirts" },
  { name: "Sweaters", href: "/products?query=sweaters" },
];

export default function Navbar() {
  const pathname = usePathname();
  const session = useSession()
  const user = session.data?.user
  const { setShowCart, showCart, cartCount } = useCartStore();
  
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6 shadow-sm">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <CastleIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Castle Fashion</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {links.map((link, idx) => (
          <div key={idx}>
            {pathname === link.href ? (
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                href={link.href}
              >
                {link.name}
              </Link>
            ):(
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-10">
        <Link
          href="#"
          className="relative"
          prefetch={false}
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCartIcon className="h-6 w-6" />
          <Badge className="absolute -top-2 -right-2 rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
            {cartCount}
          </Badge>
        </Link>
        {session.data?.user.token ? <UserDropDown data={user}/> :
        <div className="hidden md:flex items-center gap-2">
        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Login
        </Link>
        <Link
          href="/register"
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Signup
        </Link>
      </div>
        }
      </div>
    </header>
  );
}

function CastleIcon(props: any) {
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
      <path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
      <path d="M18 11V4H6v7" />
      <path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4" />
      <path d="M22 11V9" />
      <path d="M2 11V9" />
      <path d="M6 4V2" />
      <path d="M18 4V2" />
      <path d="M10 4V2" />
      <path d="M14 4V2" />
    </svg>
  )
}

function ShoppingCartIcon(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
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
  );
}

const UserDropDown = ({data}:{data: any}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>{data.email?.at(0) ?? '' + data.email?.at(-1) ?? ''}</AvatarFallback>

</Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>My Account</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
