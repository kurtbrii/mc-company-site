"use client";

import Image from "next/image";
import { api } from "~/trpc/react";

export default function TimeInUser({ params }: { params: { id: string } }) {
  const getMember = api.user.getMember.useQuery({ id: params.id });

  return (
    <>
      <div>Id: {getMember?.data?.id}</div>
      <div>Name: {getMember?.data?.fullName}</div>
    </>
  );
}
