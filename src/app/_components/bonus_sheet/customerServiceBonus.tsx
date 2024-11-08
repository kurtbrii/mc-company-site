"use client";

import { useEffect } from "react";
import Sidebar from "../sidebar";
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
import { CustomerServiceSchema } from "../../utils/zodHelpers";

export default function CustumerServiceBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  const dateNow = new Date(Date.now());

  const subumitCustomerServiceForm =
    api.bonusSheet.createCustomerServiceBonus.useMutation({});

  // const { data: getOne, isLoading: getOneLoading } =
  //   api.survey.getOneSurvey.useQuery({
  //     userId: session?.user.id ?? "",
  //     month: dateNow.getMonth() + 1, // 0 indexing
  //   });

  // ! FORM DECLARATIONS
  type FunnelBuildersBonusSchemaType = z.infer<typeof CustomerServiceSchema>;

  const form = useForm<FunnelBuildersBonusSchemaType>({
    defaultValues: {
      hoursWorked: 0,
      ticketsResolved: 0,
      disputesResolved: 0,
      userId: "",
    },
    resolver: zodResolver(CustomerServiceSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof CustomerServiceSchema>) => {
    console.log(data);
    void subumitCustomerServiceForm.mutateAsync({
      hoursWorked: data.hoursWorked,
      ticketsResolved: data.ticketsResolved,
      disputesResolved: data.disputesResolved,
      userId: userId,
    });

    toast({
      title: "Successfully submitted form",
    });

    // setTimeout(function () {
    //   location.reload();
    // }, 3000);
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
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here (ex: 1.5)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* How many tickets did you resolve? */}
              <FormField
                control={form.control}
                name="ticketsResolved"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many tickets did you resolve?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here (ex: 1.5)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* //  How many disputes did you resolve?*/}
              <FormField
                control={form.control}
                name="disputesResolved"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      {" "}
                      How many disputes did you resolve?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here (ex: 1.5)"
                        {...field}
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
