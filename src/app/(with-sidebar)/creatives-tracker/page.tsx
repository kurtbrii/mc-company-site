"use client";

import { api } from "~/trpc/react";
import CreativesRadio from "~/app/_components/creativesRadio";

export default function CreativesTracker() {
  return (
    <div className="m-10 flex w-screen flex-col items-center gap-4">
      <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
        CREATIVES TRACKER
      </h1>

      <div className="sm:rounded-lg relative overflow-hidden overflow-x-auto text-white shadow-md">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="bg-discord_left text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Set 1
              </th>
              <th scope="col" className="px-6 py-3">
                Set 2
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-discord_left">
              {/* PRODUCT DETAIL */}
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                P128 FR
              </th>

              {/* MAP SETS */}
              <td className="">
                <CreativesRadio />
              </td>
              <td className="">
                <CreativesRadio />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
