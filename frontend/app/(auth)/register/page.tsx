"use client"
import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "@/lib/axios"
import { toast } from "sonner"
import { AxiosError } from "axios"
import Image from "next/image"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Implement your registration logic here
    try {
      const res = await axios.post("/auth/v1/register", values)      
      if (res.data.code === "0050" && res.data.message === "Account created successfully.") {
        setIsLoading(false)
        toast.success("Registration successful")
      }
    } catch (error) {
      interface AxiosErrorInterface {
        message: string,
        code: string,
        error: string
    }
      setIsLoading(false)
      toast.error((error as AxiosError<AxiosErrorInterface>).response?.data?.error || (error as AxiosError<AxiosErrorInterface>).response?.data?.message)
    }
  }

  return (
    <div className="grid w-full max-w-6xl grid-cols-1 items-center justify-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:py-16 xl:gap-16">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create your account to start shopping with us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter a secure password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4" prefetch={false}>
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="hidden md:block relative">
        <Image
          src="https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={600}
          height={600}
          alt="Sign up"
          className="aspect-square w-full rounded-lg object-cover"
        />
        <div className="absolute top-20 left-1/2 w-full transform text-center -translate-x-1/2 -translate-y-1/2 text-secondary px-4 py-2 rounded-md font-black text-5xl">
          Join the Style Revolution
        </div>
      </div>
    </div>
  )
}