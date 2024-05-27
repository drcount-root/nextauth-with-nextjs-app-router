import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import nextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "john@gmail.com" || password !== "1234") {
          throw new Error("invalid credentials");
        } else {
          let user = {
            id: "1234",
            name: "John Doe",
            email: "john@gmail.com",
            role: "admin",
          };

          // if everything is fine
          console.log(user, "gfgfgf");
          return user;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: { signIn: "/" },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        (token.id = user.id),
          (token.name = user.name),
          (token.role = user.role);
      }
      return token;
    },
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session?.user,
          id: token?.id,
          role: token?.role,
        },
      };
    },
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
