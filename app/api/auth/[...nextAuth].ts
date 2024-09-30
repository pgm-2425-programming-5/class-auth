// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// In-memory user store (for demonstration purposes)
interface User {
  id: number;
  name: string;
  email: string;
  password: string | null; // Hashed password
  githubId: string | null;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "user@example.com",
    password: " $2a$10$QskcLZOxKcxx8j/n0UaD9extW2Mg.L.BrrR2cPRcyUnGgXvhSP6Zu ", // Replace with actual hashed password
    githubId: null,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider for Email and Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const user = users.find((user) => user.email === email);

        if (user && user.password) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }

        // If no user is found or password is incorrect
        return null;
      },
    }),
    // GitHub Provider for OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the GitHub ID to the token right after sign in
      if (account && profile) {
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
