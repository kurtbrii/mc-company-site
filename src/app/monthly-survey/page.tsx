"use client";

import Sidebar from "../_components/sidebar";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
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

import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SurveySchema } from "../utils/zodHelpers";

import { api } from "~/trpc/react";

export default function MonthlySurvey() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const dateNow = new Date(Date.now());
  const lastDateMonth = getLastDayOfMonth(dateNow);

  const submitSurvey = api.survey.createSurvey.useMutation({});

  // ! FORM DECLARATIONS
  type SurveySchemaType = z.infer<typeof SurveySchema>;

  const form = useForm<SurveySchemaType>({
    defaultValues: {
      feelBetter: "YES",
      userId: session?.user.id ?? "userId",
      comments: "",
      listenedTo: "YES",
      motivated: "MORE",
      stillHappy: "YES",
    },
    resolver: zodResolver(SurveySchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof SurveySchema>) => {
    await submitSurvey.mutateAsync({
      userId: session?.user.id ?? "",
      comments: data.comments,
      feelBetter: data.feelBetter,
      listenedTo: data.listenedTo,
      motivated: data.motivated,
      stillHappy: data.stillHappy,
    });

    toast({
      title: "Successfully submitted monthly survey",
    });
  };

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* FORMS */}
      {![lastDateMonth.getDate(), 31, 1, 2, 3].includes(dateNow.getDate()) ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <p>This is only accessible in the end of the month</p>
        </div>
      ) : (
        <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
          <Form {...form}>
            <h1 className="self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
              MONTHLY SURVEY
            </h1>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-3 space-y-8 border-none"
            >
              <div className="flex max-w-96 scale-90 flex-col gap-3 tablet:scale-100">
                {/* Do you feel better than last month? */}
                <FormField
                  control={form.control}
                  name="feelBetter"
                  render={({ field }) => (
                    <FormItem className="rounded-md bg-discord_left px-8 py-5">
                      <FormLabel className="text-lg">
                        Do you feel better than last month?
                      </FormLabel>

                      <FormControl className="">
                        <RadioGroup
                          onValueChange={field.onChange}
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="YES" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="SAME" />
                            </FormControl>
                            <FormLabel className="font-normal">Same</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="NO" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Are you still happy in your position? */}
                <FormField
                  control={form.control}
                  name="stillHappy"
                  render={({ field }) => (
                    <FormItem className="rounded-md bg-discord_left px-8 py-5">
                      <FormLabel className="text-lg">
                        Are you still happy in your position?
                      </FormLabel>

                      <FormControl className="">
                        <RadioGroup
                          onValueChange={field.onChange}
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="YES" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="NO" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Do you feel listened to? */}
                <FormField
                  control={form.control}
                  name="listenedTo"
                  render={({ field }) => (
                    <FormItem className="rounded-md bg-discord_left px-8 py-5">
                      <FormLabel className="text-lg">
                        Do you feel listened to?
                      </FormLabel>

                      <FormControl className="">
                        <RadioGroup
                          onValueChange={field.onChange}
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="YES" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="NO" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Do you feel more motivated than last month? */}
                <FormField
                  control={form.control}
                  name="motivated"
                  render={({ field }) => (
                    <FormItem className="rounded-md bg-discord_left px-8 py-5">
                      <FormLabel className="text-lg">
                        Do you feel more motivated than last month?
                      </FormLabel>

                      <FormControl className="">
                        <RadioGroup
                          onValueChange={field.onChange}
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="MORE" />
                            </FormControl>
                            <FormLabel className="font-normal">More</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="SAME" />
                            </FormControl>
                            <FormLabel className="font-normal">Same</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="LESS" />
                            </FormControl>
                            <FormLabel className="font-normal">Less</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem className="rounded-md bg-discord_left px-8 py-5">
                      <FormLabel className="text-lg">
                        Comments/Suggestions
                      </FormLabel>

                      <FormControl className="">
                        <Textarea
                          onChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Type your comments/suggestions here."
                          className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
        </div>
      )}
    </div>
  );
}

function getLastDayOfMonth(date: Date) {
  // Set the date to the first day of the next month, then go one day back
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDay;
}
