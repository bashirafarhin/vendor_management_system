import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: true,
  callbacks: {
    async signIn({}) {
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };