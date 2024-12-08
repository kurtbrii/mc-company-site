"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
import {
  getCurrentMonday,
  getAverageProductivity,
  copyToClipboard,
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

import { DeleteDialog } from "~/app/_components/deleteDialog";
import { useToast } from "~/components/hooks/use-toast";
import { useSession } from "next-auth/react";
import { superUsers } from "~/app/utils/helper";

export default function BonusSheetFBMarketing({
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

  const {
    data: fbMarketingBonus,
    isLoading,
    refetch: refetchFbMarketingBonus,
  } = api.bonusSheet.getFBMarketingBonus.useQuery({
    userId: params.id,
    startDate: date?.from,
    endDate: date?.to,
  });
  const { data: session } = useSession();
  const { toast } = useToast();

  const deleteBonus = api.bonusSheet.deleteFbMarketingBonus.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully deleted details",
      });
    },
  });

  const handleClick = (id: string) => {
    deleteBonus.mutate({
      id: id,
    });

    void refetchFbMarketingBonus();
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

      <DateFilter date={date} setDate={setDate} />

      <Table className="mt-14 w-[800px] justify-self-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="w-64 text-center">
              What is the date?
            </TableHead>
            <TableHead className="w-64 text-center">
              How many hours did the campaigns launching take?
            </TableHead>
            <TableHead className="w-64 text-center">
              How many funnels did you create from scratch?
            </TableHead>
            <TableHead className="w-64 text-center">
              Productivity Score
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fbMarketingBonus?.map((fbMarketing, index) => {
            totalProductivity += fbMarketing.productivity!;

            return (
              <TableRow key={index} className="text-center">
                <TableCell className="w-48 font-medium">
                  <button
                    className="hover:text-everyone"
                    onClick={() => {
                      copyToClipboard(fbMarketing.id);

                      toast({
                        title: "Text copied to clipboard",
                      });
                    }}
                  >
                    {fbMarketing.id}
                  </button>
                </TableCell>

                <TableCell className="w-48 font-medium">
                  {format(fbMarketing.dateOfWork, "PP")}
                </TableCell>

                <TableCell className="font-medium">
                  {fbMarketing.hoursCampaignsLaunched}
                </TableCell>

                <TableCell className="font-medium">
                  {fbMarketing.campaignsLaunched}
                </TableCell>

                <TableCell className="font-medium">
                  {(fbMarketing.productivity! * 100).toFixed(2)}
                </TableCell>

                {superUsers.includes(session?.user?.role ?? "CEO") && (
                  <TableCell className="text-right">
                    <DeleteDialog
                      item={fbMarketing}
                      handleClick={handleClick}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {fbMarketingBonus && (
        <p className="mt-20 self-end text-lg">
          Average Productivity:{" "}
          {getAverageProductivity(totalProductivity, fbMarketingBonus.length)}%
        </p>
      )}
    </div>
  );
}
