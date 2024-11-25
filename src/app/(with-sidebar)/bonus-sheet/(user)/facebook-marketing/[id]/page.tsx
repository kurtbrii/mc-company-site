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

export default function BonusSheetFBMarketing({
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

  const { data: fbMarketingBonus, isLoading } =
    api.bonusSheet.getFBMarketingBonus.useQuery({
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

      <Table className="mt-14 w-[800px] justify-self-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-64 text-center">
              What is the date?
            </TableHead>
            <TableHead className="w-64 text-center">
              How many hours did the campaigns launching take?
            </TableHead>
            <TableHead className="w-64 text-center">
              How many funnels did you create from scratch?
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fbMarketingBonus?.map((fbMarketing, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="w-48 font-medium">
                {format(fbMarketing.dateOfWork, "PP")}
              </TableCell>

              <TableCell className="font-medium">
                {fbMarketing.hoursCampaignsLaunched}
              </TableCell>

              <TableCell className="font-medium">
                {fbMarketing.campaignsLaunched}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
