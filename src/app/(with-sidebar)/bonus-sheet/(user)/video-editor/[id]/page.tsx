"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import { getCurrentMonday } from "~/app/utils/functionHelpers";
import { type UserProps } from "~/app/utils/propsHelpers";
import { type DateRange } from "react-day-picker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { UserCardLoading } from "~/app/_components/loading_state/userCardLoading";
import { DatePickerWithRange } from "~/app/_components/datePicker";
import React from "react";
import { addDays } from "date-fns";
import { format } from "date-fns";

export default function BonusSheetVideoEditor({
  params,
}: {
  params: { id: string };
}) {
  const getMember = api.user.getMember.useQuery({ id: params.id });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: getCurrentMonday() ?? new Date("2024-10-31"),
    to: addDays(getCurrentMonday(), 6),
  });

  date?.to?.setHours(23, 59, 59, 999);

  const { data: getVideoEditorBonus, isLoading } =
    api.bonusSheet.getVideoEditorBonus.useQuery({
      userId: params.id,
      startDate: date?.from,
      endDate: date?.to,
    });

  const changeDate = (
    setDate: (date: DateRange | undefined) => void,
    newStart: Date,
    newEnd: Date,
  ) => {
    setDate({ from: newStart, to: newEnd });
  };

  return (
    <div className="m-10 flex w-full flex-col items-center gap-4">
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
      </div>

      <Table className="mt-14">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">What is the date?</TableHead>
            <TableHead className="text-center">
              How many hours did you work?
            </TableHead>
            <TableHead className="text-center">
              How many ads did you make with the competitors ad as a basis?{" "}
            </TableHead>
            <TableHead className="text-center">
              How many new scrollstoppers did you create for an existing ad?{" "}
            </TableHead>
            <TableHead className="text-center">
              How many image ads did you create?
            </TableHead>
            <TableHead className="text-center">
              How many VSL&apos;s did you make?
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getVideoEditorBonus?.map((videoEditor, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="w-48 font-medium">
                {format(videoEditor.dateOfWork, "PP")}
              </TableCell>
              <TableCell className="font-medium">
                {videoEditor.hoursWorked}
              </TableCell>
              <TableCell className="font-medium">
                {videoEditor.competitorAdsBasis}
              </TableCell>
              <TableCell className="font-medium">
                {videoEditor.newScrollstoppers}
              </TableCell>
              <TableCell className="font-medium">
                {videoEditor.imageAds}
              </TableCell>
              <TableCell className="font-medium">{videoEditor.vsl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
