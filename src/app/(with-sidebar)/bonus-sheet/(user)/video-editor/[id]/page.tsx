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

  const {
    data: getVideoEditorBonus,
    isLoading,
    refetch: refetchVideoEditorBonus,
  } = api.bonusSheet.getVideoEditorBonus.useQuery({
    userId: params.id,
    startDate: date?.from,
    endDate: date?.to,
  });

  let totalProductivity = 0;

  const { data: session } = useSession();
  const { toast } = useToast();
  const deleteBonus = api.bonusSheet.deleteVideoEditorBonus.useMutation({
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

    void refetchVideoEditorBonus();
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

      <Table className="mt-14 w-screen">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
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
          {getVideoEditorBonus?.map((videoEditor, index) => {
            totalProductivity += videoEditor.productivity!;
            return (
              <TableRow key={index} className="text-center">
                <TableCell className="w-48 font-medium">
                  <button
                    className="hover:text-everyone"
                    onClick={() => {
                      copyToClipboard(videoEditor.id);

                      toast({
                        title: "Text copied to clipboard",
                      });
                    }}
                  >
                    {videoEditor.id}
                  </button>
                </TableCell>
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
                  {(videoEditor.productivity! * 100).toFixed(2)}%
                </TableCell>
                {superUsers.includes(session?.user?.role ?? "CEO") && (
                  <TableCell className="text-right">
                    <DeleteDialog
                      item={videoEditor}
                      handleClick={handleClick}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {getVideoEditorBonus && (
        <p className="mt-20 self-end text-lg">
          Average Productivity:{" "}
          {getAverageProductivity(
            totalProductivity,
            getVideoEditorBonus.length,
          )}
          %
        </p>
      )}
    </div>
  );
}
