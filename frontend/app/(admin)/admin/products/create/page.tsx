"use client";
import { ChevronLeft, Upload, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "@/lib/axios";
import { useCurrentToken } from "@/hooks/use-current-token";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "@/components/Loader";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  quantity: z.number().int().positive({
    message: "Quantity must be a positive integer.",
  }),
  productImage: z.array(z.instanceof(globalThis.File)).min(1, "You must upload atleast one image").max(3, "You can upload up to 3 images"),
  category: z.string().min(1,{
    message: "Category must be selected.",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;


const CreateProduct = () => {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          price: 0,
          quantity: 0,
          productImage: [],
          category: "",
        },
      });

      const token = useCurrentToken();
    
      const onSubmit: SubmitHandler<ProductFormValues> = (data: ProductFormValues) => {
        setIsLoading(true);
        // Handle form submission
        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());
        formData.append("category", data.category);
        data.productImage[0]&& formData.append("productImage", data.productImage[0]);
        data.productImage[1]&& formData.append("productImage", data.productImage[1]);
        data.productImage[2] && formData.append("productImage", data.productImage[2]);

        axios.post("product/v1", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
            
          }
        }).then((res) => {
          setIsLoading(false);
          toast("Product created successfully")
          form.reset();
        }).catch((err) => {
          setIsLoading(false);
          toast("Product creation failed try again after sometime")
        });
      };
  

  return (
    <>
    {isLoading ? <Loader /> : <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Create Product
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                New
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" type="reset">
                  Discard
                </Button>
                <Button size="sm" type="submit">Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Enter the basic details of the product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="min-h-32" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="t-shirts">T-Shirts</SelectItem>
                              <SelectItem value="hoodies">Hoodies</SelectItem>
                              <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>
              Upload up to 3 product images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4">
                      {field.value.map((file, index) => (
                        <div key={index} className="relative">
                          <Image 
                            src={URL.createObjectURL(file)} 
                            alt={`Product image ${index + 1}`} 
                            width={128} 
                            height={128} 
                            className="rounded-md object-cover w-full h-32"
                          />
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => {
                              const newFiles = [...field.value];
                              newFiles.splice(index, 1);
                              field.onChange(newFiles);
                            }}
                          >
                            <XIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      {field.value.length < 3 && (
                        <Label 
                          htmlFor="productImage" 
                          className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer relative"
                        >
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="productImage" 
                            type="file" 
                            className="sr-only" 
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              field.onChange([...field.value, ...files].slice(0, 3));
                            }}
                            multiple
                            accept="image/*"
                          />
                          <span className="sr-only">Upload</span>
                        </Label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm" type="reset">
                Discard
              </Button>
              <Button size="sm" type="submit">Save Product</Button>
            </div>
          </div>
        </main>
      </form>
    </Form>}
                        </>
  );
};

export default CreateProduct;


