import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthSessionProvider from "../components/sessionProvider";
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Page",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
