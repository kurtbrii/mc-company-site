"use client";

import Sidebar from "../_components/sidebar";
import { useSession } from "next-auth/react";

import VideoEditorsBonus from "../_components/bonus_sheet/VideoEditorsBonus";
import FunnelBuildersBonus from "../_components/bonus_sheet/funnelBuildersBonus";

export default function TimeIn() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {user?.role === "FUNNEL_BUILDER" && <FunnelBuildersBonus />}
      {user?.role === "VIDEO_EDITOR" && <VideoEditorsBonus />}
      {user?.role === "CUSTOMER_SERVICE" && <VideoEditorsBonus />}
    </div>
  );
}
