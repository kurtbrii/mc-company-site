import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { type UseFormReturn } from "react-hook-form";

interface FormFieldProps {
  form: UseFormReturn<
    {
      userId: string;
      timeInDescription: string;
      timeOutDescription?: string | undefined;
      timeOut?: Date | undefined;
      timeIn?: Date | undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  name: "timeOut" | "timeIn";
  formLabel: string;
}

export function DateTimeFormField({ form, name, formLabel }: FormFieldProps) {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue(name, date);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = form.getValues(name) ?? new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue(name, newDate);
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="rounded-md bg-discord_left px-8 py-5">
          <FormLabel className="text-lg">Time {formLabel} Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "MM/dd/yyyy hh:mm aa")
                  ) : (
                    <span className="text-white">MM/DD/YYYY hh:mm aa</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="flex">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={handleDateSelect}
                  initialFocus
                  fromDate={new Date("January 1, 2024")}
                  toDate={new Date()}
                />
                <div className="sm:divide-x flex h-[300px] flex-row divide-y-0">
                  <ScrollArea className="w-auto">
                    <div className="flex flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i + 1)
                        .reverse()
                        .map((hour) => (
                          <Button
                            key={hour}
                            size="icon"
                            variant={
                              field.value &&
                              field.value.getHours() % 12 === hour % 12
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full aspect-square shrink-0"
                            onClick={() =>
                              handleTimeChange("hour", hour.toString())
                            }
                          >
                            {hour}
                          </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="vertical" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-auto">
                    <div className="flex flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size="icon"
                            variant={
                              field.value && field.value.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full aspect-square shrink-0"
                            onClick={() =>
                              handleTimeChange("minute", minute.toString())
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        ),
                      )}
                    </div>
                    <ScrollBar orientation="vertical" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="">
                    <div className="flex flex-col p-2">
                      {["AM", "PM"].map((ampm) => (
                        <Button
                          key={ampm}
                          size="icon"
                          variant={
                            field.value &&
                            ((ampm === "AM" && field.value.getHours() < 12) ||
                              (ampm === "PM" && field.value.getHours() >= 12))
                              ? "default"
                              : "ghost"
                          }
                          className="sm:w-full aspect-square shrink-0"
                          onClick={() => handleTimeChange("ampm", ampm)}
                        >
                          {ampm}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
