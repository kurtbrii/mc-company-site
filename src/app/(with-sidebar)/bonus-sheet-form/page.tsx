"use client";

import { useSession } from "next-auth/react";

import VideoEditorsBonus from "../../_components/bonus_sheet/VideoEditorsBonus";
import FunnelBuildersBonus from "../../_components/bonus_sheet/funnelBuildersBonus";
import CustomerServiceBonus from "../../_components/bonus_sheet/customerServiceBonus";
import FacebookMarketingBonus from "~/app/_components/bonus_sheet/facebookMarketingBonus";
import ManagerBonus from "~/app/_components/bonus_sheet/managerBonus";

export default function TimeIn() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <>
      {status === "loading" ? (
        <>
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <div className="h-4 w-96 animate-pulse rounded-lg bg-discord_left"></div>
            <div className="h-4 w-96 animate-pulse rounded-lg bg-discord_left"></div>
          </div>
        </>
      ) : (
        <>
          {user?.role === "FUNNEL_BUILDER" && <FunnelBuildersBonus />}
          {user?.role === "VIDEO_EDITOR" && <VideoEditorsBonus />}
          {user?.role === "CUSTOMER_SERVICE" && <CustomerServiceBonus />}
          {user?.role === "FACEBOOK_MARKETING" && <FacebookMarketingBonus />}
          {user?.role === "MANAGER" && <ManagerBonus />}
        </>
      )}
    </>
  );
}
