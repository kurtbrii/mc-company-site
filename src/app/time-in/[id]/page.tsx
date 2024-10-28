"use client";

import Image from "next/image";
import { api } from "~/trpc/react";
import UserCard from "~/app/_components/userCard";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Sidebar from "~/app/_components/sidebar";
import { getTime } from "~/app/utils/functionHelpers";

export default function TimeInUser({ params }: { params: { id: string } }) {
  const getMember = api.user.getMember.useQuery({ id: params.id });
  const getUserTimeIn = api.timeIn.getAllTimeIn.useQuery({ userId: params.id });

  return (
    <div className="flex">
      <Sidebar />

      <div className="mt-10 flex w-screen flex-col items-center">
        <UserCard />
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
            {getUserTimeIn?.data?.map((item, index) => (
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
