"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import { type UserProps } from "~/app/utils/propsHelpers";
import { type DateRange } from "react-day-picker";
import DateFilter from "~/app/_components/dateFilter";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getCurrentMonday } from "~/app/utils/functionHelpers";
import { getTime } from "~/app/utils/functionHelpers";
import { UserCardLoading } from "~/app/_components/loading_state/userCardLoading";
import React from "react";
import { addDays } from "date-fns";

export default function TimeInUser({ params }: { params: { id: string } }) {
  const getMember = api.user.getMember.useQuery({ id: params.id });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: getCurrentMonday() ?? new Date("2024-10-31"),
    to: addDays(getCurrentMonday(), 6),
  });

  date?.from?.setHours(0, 0, 0, 0);
  date?.to?.setHours(23, 59, 59, 999);

  const { data: getUserTimeIn, isLoading } = api.timeIn.getAllTimeIn.useQuery({
    userId: params.id,
    startDate: date?.from,
    endDate: date?.to,
  });

  return (
    <div className="m-10 flex w-screen flex-col items-center gap-4">
      {isLoading ? (
        <UserCardLoading />
      ) : (
        <div className="w-full scale-75 tablet:scale-100">
          <UserCard
            member={getMember?.data as UserProps}
            className={"overflow-visible"}
          />
        </div>
      )}

      <DateFilter date={date} setDate={setDate} />

      <Table className="mt-14">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Time In Id</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Day</TableHead>
            <TableHead className="text-center">Time In</TableHead>
            <TableHead className="text-center">Time In Description</TableHead>
            <TableHead className="text-center">Time Out</TableHead>
            <TableHead className="text-center">Time Out Description</TableHead>
            <TableHead className="text-center">Total</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getUserTimeIn?.map((item, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.timeIn?.toLocaleDateString()}</TableCell>
              <TableCell>
                {item.timeIn?.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </TableCell>
              <TableCell>{item.timeIn?.toLocaleTimeString()}</TableCell>
              <TableCell>
                {item.timeInDescription === "Time Out"
                  ? "-"
                  : item.timeInDescription}
              </TableCell>
              <TableCell>
                {item.timeOut ? item.timeOut.toLocaleTimeString() : "-"}
              </TableCell>
              <TableCell>
                {item.timeOutDescription === "Initial Time Out Description"
                  ? "-"
                  : item.timeOutDescription}
              </TableCell>
              <TableCell>
                {getTime(item.timeIn ?? new Date(), item.timeOut ?? new Date())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
