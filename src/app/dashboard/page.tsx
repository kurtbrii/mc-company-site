"use client";

import Sidebar from "../_components/sidebar";
import { useSession } from "next-auth/react";
import { userColor } from "../utils/functionHelpers";

export default function Dashboard() {
  const { data: session, status } = useSession();

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* DASHBOARD - TIME IN/TIME OUT */}
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 text-center">
        <p className="text-4xl">
          Welcome Back,{" "}
          <span
            className={`${userColor(session?.user.role ?? "")} rounded-lg p-2`}
            // className={`rounded-lg bg-everyone_bg p-2 text-everyone`}
          >
            {session?.user.name}
          </span>
        </p>

        <button
          onClick={handleTimeInOut}
          className="bg-button_disabled text-white_disabled flex cursor-not-allowed items-center gap-2 rounded-md px-6 py-3"
          disabled
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
      </div>
    </div>
  );
}

const handleTimeInOut = () => {
  alert("this time in is temporary");
};
