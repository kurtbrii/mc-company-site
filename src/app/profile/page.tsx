"use client";

import Sidebar from "../_components/sidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { userColor, userRole } from "../utils/functionHelpers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "../utils/zodHelpers";
import { z } from "zod";

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;
  const [openForm, handleOpenForm] = useState(false);

  const handleEditButton = () => {
    handleOpenForm(!openForm);
  };

  type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* DASHBOARD - TIME IN/TIME OUT */}
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        {/* CONTAINER */}
        <div className="laptop flex flex-col gap-3">
          <div className="flex items-center justify-around rounded-lg bg-discord_left p-5 laptop:gap-10">
            {/* User Details */}
            <div className="flex flex-col gap-2 laptop:flex-row">
              <div>
                <Image
                  src={user?.image ?? "/assets/mc-company-logo.png"}
                  alt={"User Image"}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-2xl">{user?.fullName ?? "New User"}</p>
                <p className="text-sm italic text-everyone">@{user?.name}</p>
                <p className="text-sm">{user?.email}</p>
                <p
                  className={`self-start rounded-md px-2 py-1 text-sm ${userColor(user?.role ?? "USER")}`}
                >
                  {userRole(user?.role ?? "USER")}
                </p>
              </div>
            </div>

            <button className="self-start" onClick={() => handleEditButton()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </button>
          </div>

          <div className="flex gap-3">
            <button className="w-full rounded-lg bg-discord_left p-4">
              Time In Details
            </button>
            <button className="w-full rounded-lg bg-discord_left p-4">
              Bonus Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
