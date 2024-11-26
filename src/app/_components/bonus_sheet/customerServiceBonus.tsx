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
import { CustomerServiceSchema } from "../../utils/zodHelpers";

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

function calculateProductivity(data: z.infer<typeof CustomerServiceSchema>) {
  return (
    (data.ticketsResolved * 8 + data.disputesResolved * 0.1) / data.hoursWorked
  );
}

export default function CustumerServiceBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  const subumitCustomerServiceForm =
    api.bonusSheet.createCustomerServiceBonus.useMutation({
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
  type FunnelBuildersBonusSchemaType = z.infer<typeof CustomerServiceSchema>;

  const form = useForm<FunnelBuildersBonusSchemaType>({
    defaultValues: {
      hoursWorked: 0,
      ticketsResolved: 0,
      disputesResolved: 0,
      userId: "",
      productivity: 0,
    },
    resolver: zodResolver(CustomerServiceSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof CustomerServiceSchema>) => {
    subumitCustomerServiceForm.mutate({
      hoursWorked: data.hoursWorked,
      ticketsResolved: data.ticketsResolved,
      disputesResolved: data.disputesResolved,
      dateOfWork: data.dateOfWork,
      userId: userId,
      productivity: calculateProductivity(data),
    });
  };

  return (
    <>
      {/* FORM */}
      <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
        <Form {...form}>
          <h1 className="justify-center self-center text-2xl text-customer_service tablet:mb-5 tablet:text-4xl">
            CUSTOMER SERVICE BONUS SHEET
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
                label="How many hours did you work?"
                controlName="hoursWorked"
              />

              {/* How many tickets did you resolve? */}
              <FormFieldComponent
                form={form}
                label="How many tickets did you resolve?"
                controlName="ticketsResolved"
              />

              {/* //  How many disputes did you resolve?*/}
              <FormFieldComponent
                form={form}
                label="How many disputes did you resolve?"
                controlName="disputesResolved"
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
