"use client";

import Sidebar from "../_components/sidebar";
import { api } from "~/trpc/react";
import Image from "next/image";
import { userColor } from "../utils/functionHelpers";
import Link from "next/link";

export default function TimeIn() {
  const allMembers = api.user.getAllMembers.useQuery({});

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTAINER */}
      <div className="mt-16 flex w-screen flex-col tablet:m-16">
        <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
          ALL MEMBERS
        </h1>

        {/* mapping all members */}
        <div className="flex scale-75 flex-col flex-wrap items-center gap-4 tablet:scale-90 tablet:flex-row tablet:justify-center laptop:scale-90">
          {allMembers.data?.map((member, index) => (
            <Link
              className="flex w-[295px] flex-col gap-3 tablet:min-w-[400px]"
              key={index}
              href={`time-in/${member.id}`}
            >
              <div className="flex transform items-center justify-between rounded-lg bg-discord_left p-5 transition-transform duration-300 ease-in-out hover:scale-105 laptop:gap-10">
                {/* User Details */}
                <div className="flex flex-row gap-2 tablet:flex-row laptop:flex-row">
                  <div className="h-[60px] w-[60px] tablet:h-[100px] tablet:w-[100px]">
                    <Image
                      src={member.image ?? "/assets/mc-company-logo.png"}
                      alt={"User Image"}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-2xl">{member.fullName ?? "New User"}</p>
                    <p className="mb-2 text-sm italic text-everyone">
                      @{member.name}
                    </p>
                    {/* <p className="text-sm">{user?.email}</p> */}

                    <p
                      className={`self-start rounded-md px-2 py-1 text-sm ${userColor(member.role ?? "USER")}`}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
