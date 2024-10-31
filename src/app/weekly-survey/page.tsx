"use client";

import Sidebar from "../_components/sidebar";

export default function name() {
  const dateNow = new Date(Date.now()).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* DASHBOARD - TIME IN/TIME OUT */}

      {dateNow === "Thursday" ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <p>You </p>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center"></div>
      )}
    </div>
  );
}
