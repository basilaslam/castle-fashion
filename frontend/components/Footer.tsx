import Link from "next/link"

export default function Footer() {
  return (
    <footer data-testid="castle-icon" className="bg-muted py-6 md:py-8 mt-auto" >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <CastleIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Castle Fashion</span>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="#" className="hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Shop
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">&copy; 2024 Castle Fashion. All rights reserved.</p>
      </div>
    </footer>
  )
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