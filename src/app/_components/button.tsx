/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Make this component a client component

import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { type Session } from "next-auth/";

interface LoginButtonProps {
  session: Session | null; // or Session | undefined, depending on your usage
}

const LoginButton = ({ session }: LoginButtonProps) => {
  return (
    <div className="flex justify-center">
      {session?.user ? (
        <button
          onClick={() => signOut()}
          className="flex min-w-80 justify-center rounded-lg bg-customer_service p-4 transition duration-200"
        >
          <Image
            src={"/assets/discord-icon-svgrepo-com.svg"}
            alt={"Discord Image"}
            width={24}
            height={24}
            className="mr-2"
          />
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          className="flex min-w-80 justify-center rounded-lg bg-discord_button p-4 transition duration-200"
        >
          <Image
            src={"/assets/discord-icon-svgrepo-com.svg"}
            alt={"Discord Image"}
            width={24}
            height={24}
            className="mr-2"
          />
          Sign In With Discord
        </button>
      )}
    </div>
  );
};

export default LoginButton; // Export the client button component
