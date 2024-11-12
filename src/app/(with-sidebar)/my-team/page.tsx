"use client";

import Sidebar from "../../_components/sidebar";
import { api } from "~/trpc/react";
import { UserCardLoading } from "../../_components/loading_state/userCardLoading";
import { useSession } from "next-auth/react";
import UserCard from "../../_components/userCard";
import { type User } from "@prisma/client";
import { userRole } from "../../utils/functionHelpers";
import { useState } from "react";
import { type ROLE } from "@prisma/client";

export default function MyTeam() {
  const { data: session } = useSession();
  const user = session?.user;

  const { data: myTeam, isLoading } = api.user.getAllMembers.useQuery({
    myTeam: user?.role,
  });

  const {
    data: otherTeams,
    isLoading: otherTeamsLoading,
    refetch: fetchOtherTeams,
  } = api.user.getAllMembers.useQuery(
    {
      notMyTeam: user?.role,
    },
    { enabled: false },
  );

  const remaining = remainingMembers({ users: otherTeams ?? [] });

  const [seeAllMembers, setSeeAllMembers] = useState(false);

  const handleToggleViewAll = async () => {
    setSeeAllMembers(true);
    await fetchOtherTeams();
  };

  return (
    <div className="mt-16 flex w-screen flex-col tablet:m-16">
      <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
        My Team ({userRole(user?.role ?? "USER")})
      </h1>

      {/* mapping my team */}
      <div className="flex scale-75 flex-col flex-wrap items-center gap-4 tablet:scale-90 tablet:flex-row tablet:justify-center laptop:scale-90">
        {isLoading ? (
          <>
            <UserCardLoading />
            <UserCardLoading />
            <UserCardLoading />
            <UserCardLoading />
            <UserCardLoading />
          </>
        ) : (
          myTeam && (
            <>
              {myTeam?.map((member, index) => (
                <div
                  className="flex w-[295px] flex-col gap-3 tablet:min-w-[400px]"
                  key={index}
                >
                  <UserCard member={member} />
                </div>
              ))}
            </>
          )
        )}
      </div>

      {!seeAllMembers && (
        <button
          className="mr-12 mt-12 self-end text-everyone"
          onClick={handleToggleViewAll}
        >
          See All Members &gt;
        </button>
      )}

      {/* mapping all teams */}
      {seeAllMembers && (
        <div className="flex scale-75 flex-col flex-wrap items-center gap-4 tablet:scale-90 tablet:flex-row tablet:justify-center laptop:scale-90">
          {otherTeamsLoading ? (
            <>
              <UserCardLoading />
              <UserCardLoading />
              <UserCardLoading />
              <UserCardLoading />
              <UserCardLoading />
            </>
          ) : (
            <div>
              {Object.entries(remaining).map(([role, members]) => (
                <div key={role} className="gap4 mb-10 mt-10 flex flex-col">
                  <h1 className="self-center text-4xl text-everyone tablet:mb-5">
                    {userRole(role as ROLE)}
                  </h1>
                  <div className="mt-3 flex flex-col flex-wrap justify-center gap-5 tablet:flex-row">
                    {members?.map((member, index) => (
                      <div
                        className="flex w-[295px] flex-col gap-3 tablet:min-w-[400px]"
                        key={index}
                      >
                        <UserCard member={member} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const remainingMembers = ({ users }: { users: User[] }) => {
  const roles: Record<string, User[]> = {};

  for (const user of users) {
    if (!(user.role in roles)) {
      roles[user.role] = [];
    }
    roles[user.role]?.push(user ?? []); // Add the user to the role group
  }
  return roles;
};
