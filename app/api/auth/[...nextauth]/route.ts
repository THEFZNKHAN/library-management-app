import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            phone?: string | null;
        };
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                await connectDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
