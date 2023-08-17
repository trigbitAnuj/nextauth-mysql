import { initDb, sequelize } from "@/config/mysql";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { AuthOptions, Awaitable } from "next-auth";
import bcryptjs from "bcryptjs";
import Email from "next-auth/providers/email";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import { models } from "@/config/mysql";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials, req): Promise<any> {
        await initDb();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        console.log(credentials);
        if (email === "" || password === "") {
          // throw new Error("Please provide email or password")
          return null;
        }

        const user = await models.User.findOne({
          where: { email },
        });

        if (!user) {
          // throw new Error("No user Found")
          return null;
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
          // throw new Error("Invalid email or Password");
          return null;
        }
        if (user && validPassword) {
          console.log(user, "line 51 in authorise");
          return user;
        } else {
          return null;
        }
      },
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<any> {
      await initDb();
      console.log("jwt callback", { token, user });
      const dbUser = await models.User.findOne({
        where: { email: token.email! },
      });
      if (!dbUser) {
        return token;
      }
      return {
        id: dbUser?.id,
        email: dbUser?.email,
        name: dbUser?.name,
        role: dbUser?.role,
        picture: dbUser?.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        (session.user.id = token.id),
          (session.user.name = token.name),
          (session.user.email = token.email),
          (session.user.role = token.role),
          (session.user.image = token.picture);
      }
      return session;
    },
  },

  adapter: SequelizeAdapter(sequelize) as Adapter,

  session: {
    strategy: "jwt",
  },

  debug: process.env.NODE_ENV === "development",
  pages: {
    //signIn: "/signin",
    // error: "/error",
  },
};
