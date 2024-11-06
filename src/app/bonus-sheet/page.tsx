"use client";

import Sidebar from "../_components/sidebar";
import { api } from "~/trpc/react";
import Link from "next/link";
import UserCard from "../_components/userCard";
import { UserCardLoading } from "../_components/loading_state/userCardLoading";
import { useSession } from "next-auth/react";

import VideoEditorsBonus from "../_components/VideoEditorsBonus";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { useToast } from "~/components/hooks/use-toast";

export default function TimeIn() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {user?.role === "VIDEO_EDITOR" && <VideoEditorsBonus />}
    </div>
  );
}
