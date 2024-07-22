import Navbar from "@/components/Navbar"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

const AuthLayout = ({children}:{children: ReactNode}) => {
    return(
        
        <SessionProvider >
        <Navbar/>
        <main className="h-[calc(100dvh-7rem)] flex justify-center items-center">
            {children}
        </main>
        </SessionProvider>
        
    )
}

export default AuthLayout