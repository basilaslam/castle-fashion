import Navbar from "@/components/Navbar"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

const AuthLayout = ({children}:{children: ReactNode}) => {
    return(
        <>
        <SessionProvider >
            <Navbar/>
            {children}
        </SessionProvider>
        </>
        
    )
}

export default AuthLayout