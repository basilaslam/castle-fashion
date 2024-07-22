"use client"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Package2Icon, ShirtIcon, UserIcon } from "lucide-react"

import Link from "next/link"

const Sidebar = () => {
    return(
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <div className="flex h-14 shrink-0 items-center justify-center border-b px-2 sm:h-16">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </div>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/products"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <div className="h-5 w-5" >
                  <ShirtIcon className="h-5 w-5" />
                </div>
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/users"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <div className="h-5 w-5" >
                  <UserIcon className="h-5 w-5" />
                </div>
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    )
}

export default Sidebar