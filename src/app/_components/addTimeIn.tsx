"use client";

import React, { type Dispatch, type SetStateAction } from "react";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TimeInSchema } from "~/app/utils/zodHelpers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { DateTimeFormField } from "./form_field_components/dateTimeFormField";

interface AddTimeInProps {
  memberId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddTimeIn({
  memberId,
  refetch,
  setIsFormOpen,
}: AddTimeInProps) {
  type TimeInSchemaType = z.infer<typeof TimeInSchema>;

  const form = useForm<TimeInSchemaType>({
    defaultValues: {
      userId: memberId,
      timeInDescription: "",
      timeOutDescription: "",
      timeOut: undefined,
      timeIn: undefined,
    },
    resolver: zodResolver(TimeInSchema),
  });

  const addCustomTimeIn = api.timeIn.timeIn.useMutation({});

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof TimeInSchema>) => {
    addCustomTimeIn.mutate({
      timeIn: data.timeIn,
      timeInDescription: data.timeInDescription,
      timeOut: data.timeOut,
      timeOutDescription: data.timeOutDescription,
      userId: memberId,
    });

    setIsFormOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await refetch();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 min-w-96 space-y-8 border-none"
      >
        <div className="flex max-w-96 scale-90 flex-col gap-3 tablet:scale-100">
          <DateTimeFormField form={form} name={"timeIn"} formLabel="In" />

          <FormField
            control={form.control}
            name="timeInDescription"
            render={({ field }) => (
              <FormItem className="rounded-md bg-discord_left px-8 py-5">
                <FormLabel className="text-lg">Time In Description</FormLabel>

                <FormControl className="">
                  <Textarea
                    onChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Type time in description here."
                    className="whitespace-pre border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <DateTimeFormField form={form} name={"timeOut"} formLabel="Out" />
          <FormField
            control={form.control}
            name="timeOutDescription"
            render={({ field }) => (
              <FormItem className="rounded-md bg-discord_left px-8 py-5">
                <FormLabel className="text-lg">Time Out Description</FormLabel>

                <FormControl className="">
                  <Textarea
                    onChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Type time out description here."
                    className="whitespace-pre border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5 w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
