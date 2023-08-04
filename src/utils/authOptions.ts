import { sequelize } from "@/config/mysql";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { AuthOptions, Awaitable } from "next-auth";
import bcryptjs from "bcryptjs";
import Email from "next-auth/providers/email";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import { User } from "@/model/userModel";

sequelize.sync();

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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        console.log(credentials);
        if (email === "" || password === "") {
          // throw new Error("Please provide email or password")
          return null;
        }

        const user = await User.findOne({
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
    async jwt({ user, token, session }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
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
    error: "/error",
  },
};
