"use client";

import Sidebar from "../_components/sidebar";
import { api } from "~/trpc/react";
import Link from "next/link";
import UserCard from "../_components/userCard";
import { UserCardLoading } from "../_components/loading_state/userCardLoading";

// ! DATE CALENDAR
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";

export default function TimeIn() {
  const { data: allMembers, isLoading } = api.user.getAllMembers.useQuery({});

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
                  <UserCard member={member} className="" />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
