import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { useState } from "react";

export default function CreativesRadio() {
  const [action, setPosition] = useState("done");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className={`min-h-full min-w-full ${action === "done" ? "bg-white hover:bg-white" : "bg-discord_button hover:bg-discord_button"} `}
        ></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={action} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="done" className="">
            Done
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="launched" className="">
            Launched
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
