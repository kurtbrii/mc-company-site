"use client";

import Image from "next/image";
import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import { type UserProps } from "~/app/utils/propsHelpers";
import { type DateRange } from "react-day-picker";
import { Button } from "~/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Sidebar from "~/app/_components/sidebar";
import { getTime } from "~/app/utils/functionHelpers";
import { useSession } from "next-auth/react";
import { UserCardLoading } from "~/app/_components/loading_state/userCardLoading";
import { DatePickerWithRange } from "~/app/_components/datePicker";
import React from "react";
import { addDays } from "date-fns";

export default function TimeInUser({ params }: { params: { id: string } }) {
  const getMember = api.user.getMember.useQuery({ id: params.id });

  // const startDate = new Date("2024-10-28");
  // const endDate = new Date("2024-10-28");

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: getCurrentMonday() ?? new Date("2024-10-31"),
    to: addDays(getCurrentMonday(), 6),
  });

  date?.to?.setHours(23, 59, 59, 999);

  const { data: getUserTimeIn, isLoading } = api.timeIn.getAllTimeIn.useQuery({
    userId: params.id,
    startDate: date?.from,
    endDate: date?.to,
  });
  const { status, data } = useSession();

  const changeDate = (
    setDate: (date: DateRange | undefined) => void,
    newStart: Date,
    newEnd: Date,
  ) => {
    setDate({ from: newStart, to: newEnd });
  };

  return (
    <div className="flex">
      <Sidebar />

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

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* BACK BUTTON */}
          <button
            onClick={() =>
              changeDate(
                setDate,
                addDays(date?.from ?? new Date(Date.now()), -7),
                addDays(date?.to ?? new Date(Date.now()), -7),
              )
            }
          >
            <svg
              fill="white"
              height="35px"
              width="35px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              transform="rotate(180)"
              // xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959
			l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635
			c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"
                  />
                </g>
              </g>
            </svg>
          </button>

          {/* NEXT */}
          <button
            onClick={() =>
              changeDate(
                setDate,
                addDays(date?.from ?? new Date(Date.now()), 7),
                addDays(date?.to ?? new Date(Date.now()), 7),
              )
            }
          >
            <svg
              fill="white"
              height="35px"
              width="35px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              // xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959
			l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635
			c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"
                  />
                </g>
              </g>
            </svg>
          </button>

          {/* THIS WEEK */}
          <button
            onClick={() =>
              changeDate(
                setDate,
                getCurrentMonday(),
                addDays(getCurrentMonday(), 6),
              )
            }
            className="h-10 rounded-md bg-discord_button px-3 hover:bg-white hover:text-discord_button tablet:h-full"
          >
            This Week
          </button>

          {/* SELECT DATES */}
          <DatePickerWithRange className="" date={date} setDate={setDate} />

          <Button variant="secondary">Button</Button>
        </div>

        <Table className="mt-14">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Time In Id</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Day</TableHead>
              <TableHead className="text-center">Time In</TableHead>
              <TableHead className="text-center">Time In Description</TableHead>
              <TableHead className="text-center">Time Out</TableHead>
              <TableHead className="text-center">
                Time Out Description
              </TableHead>
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
                  {getTime(
                    item.timeIn ?? new Date(),
                    item.timeOut ?? new Date(),
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const getCurrentMonday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const distanceToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

  // Set the date to the most recent Monday
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + distanceToMonday);

  // Return the date as a string in 'YYYY-MM-DD' format
  return currentMonday;
};
