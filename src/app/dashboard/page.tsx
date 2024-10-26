"use client";

import React from "react";
import Sidebar from "../_components/sidebar";
import { useSession } from "next-auth/react";
// import { userColor, buttonActive } from "../utils/functionHelpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { TimeInSchema } from "~/app/utils/zodHelpers";
import { TimeOutSchema } from "~/app/utils/zodHelpers";
import { Toastbar } from "../_components/toastbar";

export default function Dashboard() {
  // ! GENERAL VARIABLE DECLARATIONS
  const { data: session, status, update } = useSession();
  const userRole = session?.user.role;

  const [isTimeInClicked, setIsTimeInClicked] = useState(false);
  const [isTimeOutClicked, setIsTimeOutClicked] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const timeIn = api.timeIn.timeIn.useMutation({});
  const timeOut = api.timeIn.timeOut.useMutation({});
  const updateUser = api.user.editProfile.useMutation({
    onSuccess() {
      void update();
    },
  });

  useEffect(() => {
    console.log("Session updated:", session);
  }, [session]);

  // ! FORM DECLARATION
  // ! Time In
  const handleTimeInClicked = () => {
    setIsTimeInClicked(!isTimeInClicked);
  };

  type TimeInSchemaType = z.infer<typeof TimeInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
    setValue,
    watch,
  } = useForm<TimeInSchemaType>({
    defaultValues: {
      userId: session?.user.id ?? "",
      timeInDescription: "",
    },
    resolver: zodResolver(TimeInSchema),
  });

  // Submitting Time In
  const onSubmitTimeIn: SubmitHandler<TimeInSchemaType> = async (data) => {
    const timeInDetails = await timeIn.mutateAsync({
      timeInDescription: data.timeInDescription,
      userId: session?.user.id ?? "",
    });

    await updateUser.mutateAsync({
      id: session?.user.id ?? "",
      currentTimeInId: timeInDetails.id,
    });

    setIsTimeInClicked(false);
    setIsToastVisible(true);
    setValue("timeInDescription", "");
  };

  // ! Time Out
  const handleTimeOutClicked = () => {
    setIsTimeOutClicked(!isTimeOutClicked);
  };

  type TimeOutSchemaType = z.infer<typeof TimeOutSchema>;

  const {
    register: registerOut,
    handleSubmit: handleSubmitOut,
    setValue: setValueOut,
    formState: { errors: errorsOut, isSubmitting: isSubmittingOut },
  } = useForm<TimeOutSchemaType>({
    defaultValues: {
      id: session?.user.currentTimeInId ?? "",
      timeOut: new Date(Date.now()),
      timeOutDescription: "",
    },
    resolver: zodResolver(TimeOutSchema),
  });

  // Submitting Time Out
  const onSubmitTimeOut: SubmitHandler<TimeOutSchemaType> = async (data) => {
    await timeOut.mutateAsync({
      id: session?.user.currentTimeInId ?? "",
      timeOut: new Date(Date.now()),
      timeOutDescription: data.timeOutDescription,
    });

    await updateUser.mutateAsync({
      id: session?.user.id ?? "",
      currentTimeInId: "",
    });

    setIsToastVisible(true);
    setIsTimeOutClicked(false);
    setValueOut("timeOutDescription", "");
  };

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />
      {/* DASHBOARD - TIME IN/TIME OUT */}
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
        {status === "loading" ? (
          <div className="flex flex-col gap-3">
            <div className="h-4 w-96 animate-pulse rounded-lg bg-discord_left"></div>
            <div className="h-4 w-96 animate-pulse rounded-lg bg-discord_left"></div>
          </div>
        ) : (
          <>
            <p className="text-4xl">
              Welcome Back,{" "}
              <span className={`${userColor(userRole ?? "")} rounded-lg p-2`}>
                {session?.user.name}
              </span>
            </p>
          </>
        )}

        {/* TIME IN BUTTON */}
        {(status !== "loading" &&
          !isTimeInClicked &&
          session?.user.currentTimeInId === "") ||
          (session?.user.currentTimeInId === null && (
            <button
              onClick={handleTimeInClicked}
              className={`${buttonActive(userRole ?? "")} flex items-center gap-2 rounded-md px-6 py-3`}
              disabled={userRole === "USER"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>
              Time In
            </button>
          ))}

        {/* TIME OUT BUTTON */}
        {status !== "loading" &&
          ((!isTimeOutClicked && session?.user.currentTimeInId !== "") ||
            (session?.user.currentTimeInId !== null && (
              <button
                onClick={handleTimeOutClicked}
                className="flex items-center gap-2 rounded-md bg-customer_service px-6 py-3"
                disabled={userRole === "USER"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
                Time Out
              </button>
            )))}

        {userRole === "USER" && (
          <p className="text-white">
            Set up your{" "}
            <span className="text-everyone underline">
              <Link href="/profile">profile</Link>
            </span>{" "}
            first.
          </p>
        )}

        {/* FORM: TIME IN CLICKED */}
        {isTimeInClicked && (
          <form
            onSubmit={handleSubmit(onSubmitTimeIn)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col">
              <label htmlFor="timeInDescription" className="mb-2">
                Time In Description
              </label>
              <textarea
                id="timeInDescription"
                className="h-24 w-96 rounded-lg bg-discord_left p-1 text-white outline-none focus:bg-discord_left focus:outline-none"
                {...register("timeInDescription")}
              />
              {errors.timeInDescription && (
                <p className="text-sm text-customer_service">
                  {errors.timeInDescription.message}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col-reverse justify-between gap-3 tablet:flex-row">
              <button
                type="button"
                className="w-full rounded-lg bg-customer_service p-2"
                onClick={handleTimeInClicked}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full rounded-lg bg-discord_button p-2 disabled:hover:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Time In
              </button>
            </div>
          </form>
        )}

        {/* FORM: TIME OUT CLICKED */}
        {isTimeOutClicked && (
          <form
            onSubmit={handleSubmitOut(onSubmitTimeOut)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col">
              <label htmlFor="timeOutDescription" className="mb-2">
                Time Out Description
              </label>
              <textarea
                id="timeOutDescription"
                className="h-24 w-96 rounded-lg bg-discord_left p-1 text-white outline-none focus:bg-discord_left focus:outline-none"
                {...registerOut("timeOutDescription")}
              />
              {errorsOut.timeOutDescription && (
                <p className="text-sm text-customer_service">
                  {errorsOut.timeOutDescription.message}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col-reverse justify-between gap-3 tablet:flex-row">
              <button
                type="button"
                className="w-full rounded-lg bg-customer_service p-2"
                onClick={handleTimeOutClicked}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full rounded-lg bg-discord_button p-2"
              >
                Time Out
              </button>
            </div>
          </form>
        )}
      </div>

      {status !== "loading" && isToastVisible && (
        <Toastbar
          isToastVisible={isToastVisible}
          setIsToastVisible={setIsToastVisible}
          message={`Successfully timed ${session?.user.currentTimeInId !== "" ? "in" : "out"}`}
        />
      )}
    </div>
  );
}

const userColor = (role: string) => {
  switch (role) {
    case "CEO":
      return "text-ceo bg-ceo_bg";
    case "VIDEO_EDITOR":
      return "text-video_editor bg-video_editor_bg";
    case "CUSTOMER_SERVICE":
      return "text-customer_service bg-customer_service_bg";
    case "FUNNEL_BUILDER":
      return "text-funnel_builders bg-funnel_builders_bg";
    case "STRIPE_MANAGER":
      return "text-stripe_manager bg-stripe_manager_bg";
    case "PROOFREADER":
      return "text-proofreader bg-proofreader_bg";
    case "EMAIL_MARKETING":
      return "text-email_marketing bg-email_marketing_bg";
    case "FACEBOOK_MARKETING":
      return "text-facebook_marketing bg-facebook_marketing_bg";
    case "USER":
      return "text-everyone bg-everyone_bg";
  }
};

const buttonActive = (role: string | undefined) => {
  if (role === "USER") {
    return "bg-button_disabled text-white_disabled cursor-not-allowed";
  } else {
    return "bg-discord_button text-white";
  }
};
