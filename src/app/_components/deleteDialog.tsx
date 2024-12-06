import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";

interface DialogProps {
  item: {
    id: string;
    userId: string;
    timeInDescription: string;
    timeIn: Date | null;
    timeOutDescription: string;
    timeOut: Date | null;
  };
  handleClick: (id: string) => void;
}

export function DeleteDialog({ item, handleClick }: DialogProps) {
  const [deleteInput, setDeleteInput] = useState("");
  const [toggleDialog, setToggleDialog] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 rounded-full bg-customer_service_bg p-2"
            color="#E91E63"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-customer_service">
            Delete Time In Details
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the time in details for{" "}
            <span>{item.id}</span> ?
          </DialogDescription>
        </DialogHeader>
        <div className="my-5 flex flex-col gap-3">
          <Label htmlFor="delete">
            Type &apos;<span className="text-everyone">{item.id}</span>&apos;
            for confirmation
          </Label>
          <Input
            id="delete"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={item.id !== deleteInput}
              onClick={() => handleClick(item.id)}
            >
              Delete Time In Details
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
