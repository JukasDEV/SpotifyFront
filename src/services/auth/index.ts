import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "../database"


export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        error: '/auth',
        verifyRequest: '/auth',
        newUser: '/app'
    },
    adapter: PrismaAdapter(prisma) as any, 
    providers: [
        
    ], 
})