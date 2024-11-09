"use client";

import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";
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

import Sidebar from "~/app/_components/sidebar";
import { getTime } from "~/app/utils/functionHelpers";
import { UserCardLoading } from "~/app/_components/loading_state/userCardLoading";
import { DatePickerWithRange } from "~/app/_components/datePicker";
import React from "react";
import { addDays } from "date-fns";

export default function BonusSheetVideoEditor({
  params,
}: {
  params: { id: string };
}) {
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
