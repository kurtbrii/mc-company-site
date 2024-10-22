"use client";

import Sidebar from "../_components/sidebar";
import { useSession } from "next-auth/react";
import { userColor, buttonActive } from "../utils/functionHelpers";
import Link from "next/link";
import { useEffect } from "react";
import { Suspense } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const userRole = session?.user.role;

  useEffect(() => {
    console.log("Session updated:", session);
  }, [session]);

  if (status === "loading") {
    return "loading...";
  }

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />
      {/* DASHBOARD - TIME IN/TIME OUT */}
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 text-center">
        <p className="text-4xl">
          Welcome Back,{" "}
          <Suspense fallback={<p>Loading feed...</p>}>
            <span className={`${userColor(userRole ?? "")} rounded-lg p-2`}>
              {session?.user.name}
            </span>
          </Suspense>
        </p>

        <button
          onClick={handleTimeInOut}
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
        {userRole === "USER" && (
          <p className="text-white">
            Set up your{" "}
            <span className="text-everyone underline">
              <Link href="/profile">profile</Link>
            </span>{" "}
            first.
          </p>
        )}
      </div>
    </div>
  );
}

const handleTimeInOut = () => {
  alert("this time in is temporary");
};

// const userColor = (role: string) => {
//   switch (role) {
//     case "CEO":
//       return "text-ceo bg-ceo_bg";
//     case "VIDEO_EDITOR":
//       return "text-video_editor bg-video_editor_bg";
//     case "CUSTOMER_SERVICE":
//       return "text-customer_service bg-customer_service_bg";
//     case "FUNNEL_BUILDERS":
//       return "text-funnel_builders bg-funnel_builders_bg";
//     case "USER":
//       return "text-everyone bg-everyone_bg";
//   }
// };

// const buttonActive = (role: string | undefined) => {
//   if (role === "USER") {
//     return "bg-button_disabled text-white_disabled cursor-not-allowed";
//   } else {
//     return "bg-discord_button text-white";
//   }
// };
