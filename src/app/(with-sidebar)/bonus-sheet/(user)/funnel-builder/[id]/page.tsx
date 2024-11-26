"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import {
  getCurrentMonday,
  getAverageProductivity,
} from "~/app/utils/functionHelpers";
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
import DateFilter from "~/app/_components/dateFilter";

import { UserCardLoading } from "~/app/_components/loading_state/userCardLoading";
import React from "react";
import { addDays } from "date-fns";
import { format } from "date-fns";

export default function BonusSheetFunnelBuilder({
  params,
}: {
  params: { id: string };
}) {
  const getMember = api.user.getMember.useQuery({ id: params.id });

  let totalProductivity = 0;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: getCurrentMonday() ?? new Date("2024-10-31"),
    to: addDays(getCurrentMonday(), 6),
  });

  date?.from?.setHours(0, 0, 0, 0);
  date?.to?.setHours(23, 59, 59, 999);

  const { data: funnelBuilderBonus, isLoading } =
    api.bonusSheet.getFunnelBuilderBonus.useQuery({
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
              How many funnels did you create from scratch?
            </TableHead>
            <TableHead className="text-center">
              How many funnels did you copy using trick?
            </TableHead>
            <TableHead className="text-center">
              How many advertorials did you create from scratch?
            </TableHead>
            <TableHead className="text-center">
              How many hours did you work as a customer service employee?
            </TableHead>
            <TableHead className="text-center">
              How many tickets did you resolve in Freshdesk
            </TableHead>
            <TableHead className="text-center">
              How many disputes did you answered
            </TableHead>
            <TableHead className="text-center">Productivity Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funnelBuilderBonus?.map((funnelBuilder, index) => {
            totalProductivity += funnelBuilder.productivity!;

            return (
              <TableRow key={index} className="text-center">
                <TableCell className="w-48 font-medium">
                  {format(funnelBuilder.dateOfWork, "PP")}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.hoursWorked}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.funnelsCreated}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.copyFunnelTrick}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.advertorialFromScratch}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.hoursAsCustomerService}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.ticketResolved}
                </TableCell>
                <TableCell className="font-medium">
                  {funnelBuilder.disputesAnswered}
                </TableCell>
                <TableCell className="font-medium">
                  {(funnelBuilder.productivity! * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {funnelBuilderBonus && (
        <p className="mt-20 self-end text-lg">
          Average Productivity:{" "}
          {getAverageProductivity(totalProductivity, funnelBuilderBonus.length)}
          %
        </p>
      )}
    </div>
  );
}
