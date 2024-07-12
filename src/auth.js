import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "./app/lib/prisma";
import { signInWithEmailAndPassword } from "./app/actions/auth/auth-actions";


const prismaClient = new PrismaClient();
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [GitHub, Google, Credentials({
    credentials: {
      username: { label: "Username" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const user = await signInWithEmailAndPassword(credentials.username, credentials.password);
      if ( user ) {
        return user;
      }
       
      return null;
      
    },
  }),],

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {

      const dbUser = await prisma.user.findUnique({where: { email: token.email }});
      token.roles = dbUser.roles ?? ['no-roles'];
      token.id = dbUser.id ?? 'no-uuid';
      token.isActive = dbUser.isActive;
      return token;
    },

    async session( session ) {
      return session;
    }
  }
})