"use client";

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { useToast } from "~/components/hooks/use-toast";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { FunnelBuildersSchema } from "../../utils/zodHelpers";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function FunnelBuildersBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  const submitFunnelBuildersForm =
    api.bonusSheet.createFunnelBuildersBonus.useMutation({
      onSuccess: () => {
        toast({
          title: "Successfully submitted form",
        });

        setTimeout(function () {
          location.reload();
        }, 3000);
      },

      onError: () => {
        toast({
          title: "Unsuccessful: Duplicate Date",
          variant: "destructive",
        });
      },
    });

  // ! FORM DECLARATIONS
  type FunnelBuildersBonusSchemaType = z.infer<typeof FunnelBuildersSchema>;

  const form = useForm<FunnelBuildersBonusSchemaType>({
    defaultValues: {
      advertorialFromScratch: undefined,
      copyFunnelTrick: undefined,
      disputesAnswered: undefined,
      funnelsCreated: undefined,
      hoursAsCustomerService: undefined,
      hoursWorked: undefined,
      ticketResolved: undefined,
      userId: userId ?? "",
    },
    resolver: zodResolver(FunnelBuildersSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof FunnelBuildersSchema>) => {
    void submitFunnelBuildersForm.mutateAsync({
      userId: userId,
      advertorialFromScratch: data.advertorialFromScratch,
      copyFunnelTrick: data.copyFunnelTrick,
      disputesAnswered: data.disputesAnswered,
      funnelsCreated: data.funnelsCreated,
      hoursAsCustomerService: data.hoursAsCustomerService,
      hoursWorked: data.hoursWorked,
      ticketResolved: data.ticketResolved,
      dateOfWork: data.dateOfWork,
    });
  };

  return (
    <>
      {/* FORM */}
      <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
        <Form {...form}>
          <h1 className="justify-center self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
            FUNNEL BUILDERS BONUS SHEET
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-3 space-y-8 border-none"
          >
            <div className="flex min-w-56 max-w-96 scale-90 flex-col gap-3 tablet:min-w-96 tablet:scale-100">
              <FormField
                control={form.control}
                name="dateOfWork"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">What is the date?</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"default"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                            )}
                          >
                            <CalendarIcon />
                            {field.value ? (
                              format(field.value, "PP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            // max={new Date(Date.now()).toDateString()}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* How many hours did you work? */}
              <FormField
                control={form.control}
                name="hoursWorked"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many hours did you work?
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here (ex: 1.5)"
                        value={field.value ?? ""}
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

              {/* // How many funnels did you create from scratch? */}
              <FormField
                control={form.control}
                name="funnelsCreated"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many funnels did you create from scratch?
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        value={field.value ?? ""}
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

              {/* // How many funnels did you copy using trick? (fill in 0 if you didnt do anything) */}
              <FormField
                control={form.control}
                name="copyFunnelTrick"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many funnels did you copy using trick?
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        value={field.value ?? ""}
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

              {/* // How many advertorials did you create from scratch? (fill in 0 if you didnt do anything) */}
              <FormField
                control={form.control}
                name="advertorialFromScratch"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many advertorials did you create from scratch?
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        value={field.value ?? ""}
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

              {/* // How many hours did you work as a customer service employee */}
              <FormField
                control={form.control}
                name="hoursAsCustomerService"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many hours did you work as a customer service employee
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        value={field.value ?? ""}
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

              {/* // How many tickets did you resolve in Freshdesk*/}
              <FormField
                control={form.control}
                name="ticketResolved"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many tickets did you resolve in Freshdesk?
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        value={field.value ?? ""}
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

              {/* How many disputes did you answered */}
              <FormField
                control={form.control}
                name="disputesAnswered"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many disputes did you answer?
                    </FormLabel>
                    <FormControl>
                      <Input
                        step="any"
                        min="0"
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        value={field.value ?? ""}
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

              <Button type="submit" className="mt-5 w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
