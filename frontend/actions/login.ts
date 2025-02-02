"use server";

import * as z from 'zod'

import { LoginSchema } from '@/schema';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AxiosError } from 'axios';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {  

    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid fields!"}
    }

    const {username, password} = validatedFields.data

    try {
        await signIn("credentials",{
            username,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                        return { error: "Invalid credentials!" }
                default:
                    return {error: "Something went wrong!"}
            }
        }
        
        throw error
    }
}