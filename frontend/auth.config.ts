import type { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from "./schema"
import axios from "./lib/axios"
import { AxiosError } from "axios"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { username, password } = validatedFields.data
         
            const response = await axios.post('auth/v1/login', { username, password })
            if (response.data.code === "00" && response.data.message === "Success") {
              return {
                id: username,
                email: username,
                role: response.data.role,
                token: response.data.data
              }
            }
        }
        return null
      },
    })
  ]
} satisfies NextAuthConfig
