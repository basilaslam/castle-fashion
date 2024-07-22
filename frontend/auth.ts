import NextAuth from "next-auth"
import authConfig from "@/auth.config";

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  callbacks: {
    signIn({user}){
        return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token.token) {
        session.user.token = token.token as string;
      }
      if(token.role && session.user){
        session.user.role = token.role
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});