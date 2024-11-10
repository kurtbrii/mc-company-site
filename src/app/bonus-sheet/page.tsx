"use client";

import Sidebar from "../_components/sidebar";
import { api } from "~/trpc/react";
import Link from "next/link";
import UserCard from "../_components/userCard";
import { UserCardLoading } from "../_components/loading_state/userCardLoading";
import { type ROLE } from "@prisma/client";
import { getRole } from "~/app/utils/functionHelpers";

export default function TimeIn() {
  const { data: allMembers, isLoading } = api.user.getAllMembers.useQuery({
    hasBonus: true,
  });

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTAINER */}
      <div className="mt-16 flex w-screen flex-col tablet:m-16">
        <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
          BONUS SHEET (ALL MEMBERS)
        </h1>

        {/* mapping all members */}
        <div className="flex scale-75 flex-col flex-wrap items-center gap-4 tablet:scale-90 tablet:flex-row tablet:justify-center laptop:scale-90">
          {isLoading ? (
            <>
              <UserCardLoading />
              <UserCardLoading />
              <UserCardLoading />
              <UserCardLoading />
              <UserCardLoading />
            </>
          ) : (
            <>
              {allMembers?.map((member, index) => (
                <Link
                  className="flex w-[295px] flex-col gap-3 tablet:min-w-[400px]"
                  key={index}
                  href={`bonus-sheet/${getRole(member.role)}/${member.id}`}
                >
                  <UserCard member={member} />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
