import Link from "next/link";
import Image from "next/image";

// import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import LoginButton from "./_components/button";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="m-7 flex flex-col justify-around">
        {/* LOGO AND COMPANY NAME */}
        <div className="mb-0 flex items-center gap-4">
          <Image
            src={"/assets/mc-company-logo.png"}
            width={50}
            height={50}
            alt="Company Logo"
            className="rounded-lg"
          />

          <p className="text-lg">MC Company</p>
        </div>

        {/* HERO SECTION */}
        <div className="flex items-center justify-center gap-16">
          <Image
            src="/assets/hello.svg"
            width={400}
            height={400}
            alt="Company Logo"
            className="mb-4 rounded-lg" // Add margin below the image
          />

          <div className="flex flex-col gap-5 text-center">
            <h1 className="text-center text-6xl font-bold text-white">
              Hey, Team!
            </h1>
            <p className="max-w-xs text-xl text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>
          </div>
        </div>

        <LoginButton session={session} />
        {/* <Sidebar /> */}
        {/* <div></div> */}
      </main>
    </HydrateClient>
  );
}
