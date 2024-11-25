import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { DatePickerWithRange } from "./datePicker";
import { getCurrentMonday } from "~/app/utils/functionHelpers";
import { type Dispatch, type SetStateAction } from "react";

interface DateFilterProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

export default function DateFilter({ date, setDate }: DateFilterProps) {
  const changeDate = (
    setDate: (date: DateRange | undefined) => void,
    newStart: Date,
    newEnd: Date,
  ) => {
    setDate({ from: newStart, to: newEnd });
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* BACK BUTTON */}
      <button
        onClick={() =>
          changeDate(
            setDate,
            addDays(date?.from ?? new Date(Date.now()), -7),
            addDays(date?.to ?? new Date(Date.now()), -7),
          )
        }
      >
        <svg
          fill="white"
          height="35px"
          width="35px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          transform="rotate(180)"
          // xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959
  l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635
  c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"
              />
            </g>
          </g>
        </svg>
      </button>

      {/* NEXT */}
      <button
        onClick={() =>
          changeDate(
            setDate,
            addDays(date?.from ?? new Date(Date.now()), 7),
            addDays(date?.to ?? new Date(Date.now()), 7),
          )
        }
      >
        <svg
          fill="white"
          height="35px"
          width="35px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          // xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959
  l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635
  c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"
              />
            </g>
          </g>
        </svg>
      </button>

      {/* THIS WEEK */}
      <button
        onClick={() =>
          changeDate(
            setDate,
            getCurrentMonday(),
            addDays(getCurrentMonday(), 6),
          )
        }
        className="h-10 rounded-md bg-discord_button px-3 hover:bg-white hover:text-discord_button tablet:h-full"
      >
        This Week
      </button>

      {/* SELECT DATES */}
      <DatePickerWithRange className="" date={date} setDate={setDate} />
    </div>
  );
}
