"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { useCurrentToken } from "@/hooks/use-current-token";
import { getCurrentToken } from "@/lib/auth";
import axiosInstance from "@/lib/axios";
import { IProduct } from "@/types/interfaces";
import { MoreHorizontal } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export const DropDown = ({ product }: { product: IProduct }) => {
    const router = useRouter()
    const token = useCurrentToken();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={()=> router.push(`/admin/products/edit/${product._id}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => {
            try {
              await axiosInstance.delete(`product/v1/${product._id}`,{
                headers: {
                  authorization: `Bearer ${token}`,
                },
            })
            router.refresh()
            } catch (error) {
              toast.error("Prodcut deletion failed");
            }
          }}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };