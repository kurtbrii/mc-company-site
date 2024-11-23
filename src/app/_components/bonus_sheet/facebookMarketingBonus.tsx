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
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { FacebookMarketingSchema } from "../../utils/zodHelpers";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { FormFieldComponent } from "./form_field_components/customerServiceFormField";

export default function FacebookMarketingBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  const submitFacebookMarketingForm =
    api.bonusSheet.createFBMarketingBonus.useMutation({
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
  type FunnelBuildersBonusSchemaType = z.infer<typeof FacebookMarketingSchema>;

  const form = useForm<FunnelBuildersBonusSchemaType>({
    defaultValues: {
      userId: userId ?? "",
    },
    resolver: zodResolver(FacebookMarketingSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof FacebookMarketingSchema>) => {
    void submitFacebookMarketingForm.mutateAsync({
      userId: userId,
      campaignsLaunched: data.campaignsLaunched,
      dateOfWork: data.dateOfWork,
      hoursCampaignsLaunched: data.hoursCampaignsLaunched,
    });
  };

  return (
    <>
      {/* FORM */}
      <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
        <Form {...form}>
          <h1 className="justify-center self-center text-2xl text-facebook_marketing tablet:mb-5 tablet:text-4xl">
            FACEBOOK MARKETING BONUS SHEET
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
              {/* How many hours did the campaigns launching take? ( 3 hours and 30
              minutes = 3.5, 3 hours and 20 minutes = 3.33 etc etc) */}
              <FormFieldComponent
                form={form}
                label={"How many hours did the campaigns launching take?"}
                controlName="hoursCampaignsLaunched"
              />

              <FormFieldComponent
                form={form}
                label={"How many campaigns did you launch?"}
                controlName="campaignsLaunched"
              />

              {/* // How many funnels did you create from scratch? */}
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
