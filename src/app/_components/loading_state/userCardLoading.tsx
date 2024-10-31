export function UserCardLoading() {
  return (
    <div className="flex w-[295px] transform items-center justify-between gap-5 rounded-lg bg-discord_left p-5 transition-transform duration-300 ease-in-out hover:scale-105 tablet:min-w-[400px]">
      {/* User Details */}
      {/* IMAGE */}
      <div className="w-full">
        <div className="h-[100px] w-[100px] animate-pulse rounded-md bg-discord_black tablet:h-[100px] tablet:w-[100px]"></div>
      </div>

      {/* TEXT */}
      <div className="flex w-screen animate-pulse flex-col gap-2">
        <div className="h-3 w-full rounded-lg bg-discord_black"></div>
        <div className="h-3 rounded-lg bg-discord_black"></div>
        <div className="h-3 rounded-lg bg-discord_black"></div>
        <div className="mt-4 h-3 rounded-lg bg-discord_black"></div>
      </div>
    </div>
  );
}
