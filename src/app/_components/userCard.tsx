import Image from "next/image";
import { ROLE } from "@prisma/client";
import { userColor } from "../utils/functionHelpers";
import { type UserProps } from "~/app/utils/propsHelpers";

export default function UserCard({
  member,
  className,
}: {
  member: UserProps;
  className: string;
}) {
  return (
    <div className="flex transform items-center justify-between rounded-lg bg-discord_left p-5 transition-transform duration-300 ease-in-out hover:scale-105 laptop:gap-10">
      {/* User Details */}
      <div className="flex flex-row gap-3 tablet:flex-row laptop:flex-row">
        <div className="h-[100px] w-[100px]">
          <Image
            src={member?.image ?? "/assets/mc-company-logo.png"}
            alt={"User Image"}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col flex-wrap">
          <p
            className={`w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-2xl ${className}`}
          >
            {member?.fullName ?? "New User"}
          </p>
          <p className="mb-2 text-sm italic text-everyone">@{member?.name}</p>
          {/* <p className="text-sm">{user?.email}</p> */}

          <p
            className={`self-start rounded-md px-2 py-1 text-sm ${userColor(member?.role ?? "USER")}`}
          >
            {member?.role}
          </p>
        </div>
      </div>
    </div>
  );
}
