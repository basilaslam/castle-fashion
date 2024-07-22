import * as z from "zod"


export const LoginSchema = z.object({
    username: z.string().min(1,{
        message: "Email is Required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
})