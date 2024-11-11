"use-client";

import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Input } from "~/components/ui/input";

interface FormFieldProps {
  form: UseFormReturn<
    {
      competitorAdsBasis: number;
      hoursWorked: number;
      newScrollstoppers: number;
      imageAds: number;
      vsl: number;
      dateOfWork: Date;
      userId: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;

  label: string;
  controlName:
    | "competitorAdsBasis"
    | "hoursWorked"
    | "newScrollstoppers"
    | "imageAds"
    | "vsl"
    | "dateOfWork"
    | "userId";
}

export const FormFieldComponent = ({
  form,
  label,
  controlName,
}: FormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={controlName}
      // name="competitorAdsBasis"
      render={({ field }) => (
        <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
          <FormLabel className="text-lg">
            {label}
            {/* How many ads did you make with the competitors ad as a basis? */}
          </FormLabel>
          <FormControl>
            <Input
              min="0"
              step="any"
              className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter number here"
              value={
                field.value instanceof Date
                  ? field.value.toISOString().substring(0, 10)
                  : field.value || ""
              }
              onChange={(e) =>
                field.onChange(
                  e.target.value === ""
                    ? undefined
                    : parseFloat(e.target.value),
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
