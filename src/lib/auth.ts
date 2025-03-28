import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const compare = await bcrypt.compare(
          credentials.password as string,
          process.env.AUTH_PASSWORD as string,
        );

        if (!compare && credentials.username !== process.env.AUTH_USERNAME) {
          throw new Error("Invalid credentials");
        }

        return { name: credentials.username as string };
      },
    }),
  ],
});
