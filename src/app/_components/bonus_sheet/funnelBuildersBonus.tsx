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

import { FormFieldComponent } from "./form_field_components/funnelBuilderFormField";

export default function FunnelBuildersBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  function calculateTotalProductivity(
    data: z.infer<typeof FunnelBuildersSchema>,
  ) {
    return (
      (data.funnelsCreated * 2 +
        data.copyFunnelTrick * 0.25 +
        data.advertorialFromScratch * 3) /
      data.hoursWorked
    );
  }

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
      funnelsCreated: undefined,
      advertorialFromScratch: undefined,
      copyFunnelTrick: undefined,
      hoursWorked: undefined,
      userId: userId ?? "",
      productivity: 0,
    },
    resolver: zodResolver(FunnelBuildersSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof FunnelBuildersSchema>) => {
    await submitFunnelBuildersForm.mutateAsync({
      userId: userId,
      funnelsCreated: data.funnelsCreated,
      copyFunnelTrick: data.copyFunnelTrick,
      advertorialFromScratch: data.advertorialFromScratch,
      hoursWorked: data.hoursWorked,
      dateOfWork: data.dateOfWork,
      productivity: calculateTotalProductivity(data),
    });
  };

  return (
    <>
      {/* FORM */}
      <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
        <Form {...form}>
          <h1 className="justify-center self-center rounded-xl bg-funnel_builders_bg p-4 text-2xl text-funnel_builders tablet:mb-5 tablet:text-4xl">
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
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            showOutsideDays={false}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* How many hours did you work? */}
              <FormFieldComponent
                form={form}
                label={"How many hours did you work?"}
                controlName="hoursWorked"
              />
              {/* // How many funnels did you create from scratch? */}
              <FormFieldComponent
                form={form}
                label={"How many funnels did you create from scratch?"}
                controlName="funnelsCreated"
              />

              {/* // How many funnels did you copy using trick? (fill in 0 if you didnt do anything) */}
              <FormFieldComponent
                form={form}
                label={"How many funnels did you copy using trick?"}
                controlName="copyFunnelTrick"
              />

              {/* // How many advertorials did you create from scratch? (fill in 0 if you didnt do anything) */}
              <FormFieldComponent
                form={form}
                label={"How many advertorials did you create from scratch?"}
                controlName="advertorialFromScratch"
              />

              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
