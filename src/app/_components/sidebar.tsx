"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { dashboard_items } from "../utlis/helper";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside
        className={`${isOpen ? "w-80" : "w-24"} flex h-screen flex-col justify-between bg-discord_left p-5 transition-transform`}
      >
        <div className="flex flex-col gap-4">
          <svg
            className={`${isOpen ? "self-start" : "self-center"} mb-4 size-6`}
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>

          <div
            className={`${isOpen ? "justify-start" : "justify-center"} flex items-center gap-4`}
          >
            <Image
              src={"/assets/mc-company-logo.png"}
              width={50}
              height={50}
              alt="Company Logo"
              className="rounded-lg"
            />
            <p className={`text-lg ${isOpen ? "block" : "hidden"}`}>
              MC Company
            </p>{" "}
          </div>

          <ul className="space-y-2 font-medium">
            {dashboard_items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`group flex items-center rounded-lg hover:bg-discord_button ${isOpen ? "justify-start" : "justify-center"} p-2 text-white dark:text-white`}
                >
                  <svg
                    className="h-7 w-7 text-white transition duration-75"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox={item.view_box}
                  >
                    {item.svg_path.map((item2, index2) => (
                      <path key={index2} d={item2} />
                    ))}
                  </svg>

                  <span className={`${isOpen ? "" : "hidden"} ms-3`}>
                    {item.text} {/* Assuming 'item' has a 'title' property */}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <ul className="space-y-2 font-medium">
            {/* PROFILE */}
            <li>
              <Link
                href="/profile"
                className={`group flex items-center rounded-lg hover:bg-discord_button ${isOpen ? "justify-start" : "justify-center"} p-2 text-white dark:text-white`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className={`${isOpen ? "" : "hidden"} ms-3`}>
                  Profile
                </span>
              </Link>
            </li>

            {/* LOGOUT */}
            <li>
              <Link
                onClick={() => signOut({ callbackUrl: "/" })}
                href="/"
                className={`group flex items-center rounded-lg bg-customer_service ${isOpen ? "justify-start" : "justify-center"} p-2 text-white dark:text-white`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className={`${isOpen ? "" : "hidden"} ms-3`}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
