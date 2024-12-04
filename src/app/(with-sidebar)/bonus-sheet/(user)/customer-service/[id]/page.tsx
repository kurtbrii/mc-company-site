"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import {
  getCurrentMonday,
  getAverageProductivity,
} from "~/app/utils/functionHelpers";
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

export default function BonusSheetCustomerService({
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
  date?.to?.setHours(23, 59, 59);

  let totalProductivity = 0;

  const { data: customerService, isLoading } =
    api.bonusSheet.getCustomerServiceBonus.useQuery({
      userId: params.id,
      startDate: date?.from,
      endDate: date?.to,
    });

  return (
    <div className="m-10 flex flex-col items-center gap-4">
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
              How many tickets did you resolve?
            </TableHead>
            <TableHead className="text-center">
              How many disputes did you resolve?
            </TableHead>
            <TableHead className="text-center">Productivity Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customerService?.map((customerService, index) => {
            totalProductivity += customerService.productivity ?? 0;

            return (
              <TableRow key={index} className="text-center">
                <TableCell className="w-48 font-medium">
                  {format(customerService.dateOfWork, "PP")}
                </TableCell>
                <TableCell className="font-medium">
                  {customerService.hoursWorked}
                </TableCell>
                <TableCell className="font-medium">
                  {customerService.ticketsResolved}
                </TableCell>
                <TableCell className="font-medium">
                  {customerService.disputesResolved}
                </TableCell>
                <TableCell className="font-medium">
                  {(customerService.productivity! * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {customerService && (
        <p className="mt-20 self-end text-lg">
          Average Productivity:{" "}
          {getAverageProductivity(totalProductivity, customerService.length)}%
        </p>
      )}
    </div>
  );
}
