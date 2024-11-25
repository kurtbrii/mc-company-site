"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import { getCurrentMonday } from "~/app/utils/functionHelpers";
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

import { UserCardLoading } from "~/app/_components/loading_state/userCardLoading";
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

  date?.from?.setHours(0, 0, 0, 0);
  date?.to?.setHours(23, 59, 59, 999);

  const { data: getVideoEditorBonus, isLoading } =
    api.bonusSheet.getVideoEditorBonus.useQuery({
      userId: params.id,
      startDate: date?.from,
      endDate: date?.to,
    });

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
      <DateFilter date={date} setDate={setDate} />

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
            <TableHead className="text-center">Productivity Score</TableHead>
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
              <TableCell className="font-medium">
                {videoEditor.productivity! * 100}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
