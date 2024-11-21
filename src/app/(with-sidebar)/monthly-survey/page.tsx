"use client";

import { api } from "~/trpc/react";
import Link from "next/link";
import UserCard from "../../_components/userCard";
import { UserCardLoading } from "../../_components/loading_state/userCardLoading";
import { useState } from "react";
import { userRole } from "../../utils/functionHelpers";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function TimeIn() {
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));

  const { data: surveyDetails } = api.survey.getAllSurvey.useQuery({
    month: date?.getMonth(),
    year: date?.getFullYear(),
  });

  const { data: allMembers, isLoading } = api.user.getAllMembers.useQuery({
    month: date?.getMonth(),
    year: date?.getFullYear(),
  });

  return (
    <div className="mt-16 flex w-screen flex-col gap-4 tablet:m-16">
      <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
        MONTHLY SURVEY (ALL MEMBERS)
      </h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"default"}
            className={cn(
              "min-w-44 justify-start self-center text-left font-normal text-white",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            defaultMonth={date}
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex scale-75 flex-col flex-wrap items-center gap-4 tablet:scale-90 tablet:flex-row tablet:justify-center laptop:scale-90">
        <Table className="mt-14">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>

              <TableHead className="text-center">Role</TableHead>

              <TableHead className="text-center">
                Do you feel better than last month?
              </TableHead>

              <TableHead className="text-center">
                Are you still happy in your position?
              </TableHead>

              <TableHead className="text-center">
                Do you feel listened to?
              </TableHead>

              <TableHead className="text-center">
                Do you feel more motivated than last month?
              </TableHead>

              <TableHead className="text-center">
                Comments/Suggestions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveyDetails?.map((survey, index) => (
              <TableRow key={index}>
                <TableCell className="w-48 text-center font-medium">
                  {survey.User.fullName}
                </TableCell>

                <TableCell className="w-48 text-center font-medium">
                  {userRole(survey.User.role)}
                </TableCell>

                <TableCell className="w-48 text-center font-medium">
                  {survey.feelBetter}
                </TableCell>

                <TableCell className="w-48 text-center font-medium">
                  {survey.stillHappy}
                </TableCell>

                <TableCell className="w-48 text-center font-medium">
                  {survey.listenedTo}
                </TableCell>

                <TableCell className="w-48 text-center font-medium">
                  {survey.motivated}
                </TableCell>

                <TableCell className="w-48 text-center font-medium">
                  {survey.comments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-32 flex flex-col items-center">
        <h2 className="mb-5 text-xl text-everyone">
          Members who haven&apos;t submitted their survey yet:
        </h2>

        {
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
                  <UserCard member={member} key={index} />
                ))}
              </>
            )}
          </div>
        }
      </div>
    </div>
  );
}
