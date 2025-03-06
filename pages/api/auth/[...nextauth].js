import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: "vinianaazulclaralupitabeto",
  callbacks: {
    async jwt({ token, account }) {
      // Caso esteja fazendo login com o Google
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log(token);
    //   console.log(account);
      return token;
    },
    async session(session) {
      return session;
    },
  },
});
