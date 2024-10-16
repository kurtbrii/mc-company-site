import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
// import { sidebar } from "./_components/sidebar";
import { Sidebar } from "./_components/sidebar";

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
      className={`${GeistSans.variable} max-w-screen-xl bg-discord_black text-white`}
    >
      <body className="">
        {/* <Sidebar /> */}
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
