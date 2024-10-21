"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { dashboard_items } from "../utils/helper";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();

  const { data: session, status } = useSession();

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
              <li
                key={index}
                className={`${pathName === item.href && "rounded-lg bg-discord_button"}`}
              >
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
            <li
              className={`${pathName === "/profile" && "rounded-lg bg-discord_button"}`}
            >
              <Link
                href="/profile"
                className={`group flex items-center rounded-lg hover:bg-discord_button ${isOpen ? "justify-start" : "justify-center"} p-2 text-white dark:text-white`}
              >
                <Image
                  src={session?.user.image ?? "/assets/mc-company-logo.png"}
                  alt={"User Image"}
                  width={35}
                  height={35}
                  className="rounded-md"
                />

                <span className={`${isOpen ? "" : "hidden"} ms-3`}>
                  {session?.user.name}
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
