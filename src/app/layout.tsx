import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import AuthContext from "./AuthContext";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "MC Company",
  description: "MC Company Website",
  icons: [{ rel: "icon", url: "/assets/mc-company-logo.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} max-w-screen-xl text-white`}
    >
      <body className="">
        <AuthContext>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AuthContext>
        <Toaster />
      </body>
    </html>
  );
}
