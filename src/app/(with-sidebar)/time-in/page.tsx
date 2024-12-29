"use client";

import { type ROLE } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";
import { UserCardLoading } from "../../_components/loading_state/userCardLoading";
import UserCard from "../../_components/userCard";
import { userColor } from "../../utils/functionHelpers";

export default function TimeIn() {
  const [selectedRole, setSelectedRole] = useState("ALL");
  const { data: allMembers, isLoading } = api.user.getAllMembers.useQuery({
    myTeam: selectedRole === "ALL" ? "USER" : (selectedRole as ROLE),
    ...(selectedRole === "ALL" && { notMyTeam: "USER" }),
  });

  return (
    <div className="mt-16 flex w-screen flex-col gap-4 tablet:m-16">
      <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
        TIME IN (ALL MEMBERS)
      </h1>

      <select
        className={`self-center rounded-md px-2 py-1 text-sm focus:outline-none ${selectedRole === "ALL" ? userColor("USER") : userColor(selectedRole as ROLE)}`}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="VIDEO_EDITOR">Video Editor</option>
        <option value="FUNNEL_BUILDER">Funnel Builder</option>
        <option value="CUSTOMER_SERVICE">Customer Service</option>
        <option value="STRIPE_MANAGER">Stripe Manager</option>
        <option value="PROOFREADER">Proofreader</option>
        <option value="EMAIL_MARKETING">Email Marketing</option>
        <option value="FACEBOOK_MARKETING">Facebook Marketing</option>
      </select>

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
                href={`time-in/${member.id}`}
              >
                <UserCard member={member} />
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
