"use client";

import Sidebar from "../../_components/sidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getRole, userColor, userRole } from "../../utils/functionHelpers";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "../../utils/zodHelpers";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { Toastbar } from "../../_components/toastbar";
import Link from "next/link";

export default function Profile() {
  // ! VARIABLE DECLARATIONS
  const { data: session, update, status } = useSession();
  const user = session?.user;
  const [openForm, handleOpenForm] = useState(false);

  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleEditButton = () => {
    handleOpenForm(!openForm);
  };

  // ! FORM INFORMATION
  type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    getValues,
    setValue,
    watch,
  } = useForm<UpdateProfileSchemaType>({
    defaultValues: {
      fullName: user?.fullName,
      id: user?.id,
      role: user?.role,
    },
    resolver: zodResolver(UpdateProfileSchema),
  });

  const updateProfile = api.user.editProfile.useMutation({
    onSuccess() {
      void update();
    },
  });

  const formData = watch();

  const onSubmit: SubmitHandler<UpdateProfileSchemaType> = async () => {
    await updateProfile.mutateAsync({
      id: user?.id ?? "",
      fullName: formData.fullName,
      role: formData.role,
    });

    handleEditButton();
    setIsToastVisible(true);
  };

  useEffect(() => {
    setValue("id", user?.id ?? "");
    setValue("fullName", user?.fullName ?? "NEW USER");
    setValue("role", user?.role ?? "USER");
  }, [user?.fullName, user?.role, update, setValue, user?.id]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {/* CONTAINER */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-[295px] scale-75 flex-col gap-3 tablet:min-w-[500px] tablet:scale-100">
          <div className="flex items-center justify-between rounded-lg bg-discord_left p-5 laptop:gap-10">
            {/* User Details */}
            <div className="flex flex-col gap-2 tablet:flex-row laptop:flex-row">
              <div>
                {status === "loading" ? (
                  <div className="h-[100px] w-[100px] animate-pulse rounded-lg bg-discord_black"></div>
                ) : (
                  <div className="h-100px w-[100px]">
                    <Image
                      src={user?.image ?? ""}
                      alt={"User Image"}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                {status === "loading" ? (
                  <div className="flex animate-pulse flex-col gap-2">
                    <div className="h-3 w-52 rounded-lg bg-discord_black"></div>
                    <div className="h-3 rounded-lg bg-discord_black"></div>
                    <div className="h-3 rounded-lg bg-discord_black"></div>
                    <div className="mt-4 h-3 rounded-lg bg-discord_black"></div>
                  </div>
                ) : (
                  <>
                    {openForm ? (
                      <>
                        <input
                          {...(register("fullName") ?? formData.fullName)}
                          type="text"
                          name="fullName"
                          className="w-3/4 rounded-lg bg-discord_black p-1 text-white outline-none focus:bg-discord_black focus:outline-none"
                          placeholder="Enter Full Name"
                        />
                      </>
                    ) : (
                      <p className="text-2xl">{user?.fullName ?? "New User"}</p>
                    )}
                    <p className="mb-2 text-sm italic text-everyone">
                      @{user?.name}
                    </p>

                    {openForm ? (
                      <select
                        className={`self-start rounded-md px-2 py-1 text-sm focus:outline-none ${userColor(formData.role ?? "USER")} `}
                        {...register("role", { required: true })}
                      >
                        {/* <option value="CEO">CEO</option> */}
                        <option value="VIDEO_EDITOR">Video Editor</option>
                        <option value="FUNNEL_BUILDER">Funnel Builder</option>
                        <option value="CUSTOMER_SERVICE">
                          Customer Service
                        </option>
                        <option value="STRIPE_MANAGER">Stripe Manager</option>
                        <option value="PROOFREADER">Proofreader</option>
                        <option value="EMAIL_MARKETING">Email Marketing</option>
                        <option value="FACEBOOK_MARKETING">
                          Facebook Marketing
                        </option>
                      </select>
                    ) : (
                      <p
                        className={`self-start rounded-md px-2 py-1 text-sm ${userColor(user?.role ?? "USER")} `}
                      >
                        {userRole(user?.role ?? "USER")}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {status === "loading" ? (
              <div className="flex h-6 w-6 gap-1 self-start rounded-lg bg-discord_black"></div>
            ) : (
              <>
                {openForm ? (
                  <div className="flex gap-1 self-start">
                    {/* X BUTTON */}
                    <button
                      className=""
                      onClick={handleEditButton}
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* CHECK BUTTON */}
                    <button
                      className="self-start"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    {/* EDIT BUTTON */}
                    <button
                      type="button"
                      className="self-start"
                      onClick={handleEditButton}
                    >
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
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 tablet:flex-row">
            <Link
              href={`/time-in/${user?.id}`}
              className="w-full rounded-lg bg-discord_left p-4 text-center"
              type="button"
            >
              My Time In Details
            </Link>
            {user?.role !== "CEO" && (
              <Link
                className="w-full rounded-lg bg-discord_left p-4 text-center"
                type="button"
                href={`bonus-sheet/${getRole(user?.role ?? "USER")}/${user?.id}`}
              >
                My Bonus Sheet
              </Link>
            )}
          </div>

          {user?.role === "CEO" && (
            <div className="flex flex-col gap-3 tablet:flex-row">
              <Link
                href={`/time-in`}
                className="w-full rounded-lg bg-discord_left p-4 text-center"
                type="button"
              >
                Time In Details <br />
                (All Members)
              </Link>

              <Link
                href={`/bonus-sheet`}
                className="w-full rounded-lg bg-discord_left p-4 text-center"
                type="button"
              >
                Bonus Sheet <br />
                (All Members)
              </Link>
            </div>
          )}
        </div>
      </form>

      {isToastVisible && (
        <Toastbar
          isToastVisible={isToastVisible}
          setIsToastVisible={setIsToastVisible}
          message={"Successfully updated profile"}
        />
      )}
    </div>
  );
}
