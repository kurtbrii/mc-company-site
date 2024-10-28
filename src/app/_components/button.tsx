/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { type Session } from "next-auth/";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  session: Session | null; // or Session | undefined, depending on your usage
}

const LoginButton = ({ session }: LoginButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      {session?.user ? (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex min-w-80 justify-center rounded-lg bg-discord_button p-4 transition duration-200"
          >
            Go to Dashboard
          </button>
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
        </div>
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
