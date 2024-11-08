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
import { VideoEditorsBonusSchema } from "../../utils/zodHelpers";

export default function VideoEditorsBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  const dateNow = new Date(Date.now());

  const submitVideoEditorsForm =
    api.bonusSheet.createVideoEditorsBonus.useMutation({});

  // const { data: getOne, isLoading: getOneLoading } =
  //   api.survey.getOneSurvey.useQuery({
  //     userId: session?.user.id ?? "",
  //     month: dateNow.getMonth() + 1, // 0 indexing
  //   });

  // ! FORM DECLARATIONS
  type VideoEditorsBonusSchemaType = z.infer<typeof VideoEditorsBonusSchema>;

  const form = useForm<VideoEditorsBonusSchemaType>({
    defaultValues: {
      competitorAdsBasis: 0,
      hoursWorked: 0,
      imageAds: 0,
      newScrollstoppers: 0,
      vsl: 0,
      userId: userId ?? "",
    },
    resolver: zodResolver(VideoEditorsBonusSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof VideoEditorsBonusSchema>) => {
    void submitVideoEditorsForm.mutateAsync({
      userId: userId,
      competitorAdsBasis: data.competitorAdsBasis,
      hoursWorked: data.hoursWorked,
      imageAds: data.imageAds,
      newScrollstoppers: data.newScrollstoppers,
      vsl: data.vsl,
    });

    toast({
      title: "Successfully submitted form",
    });

    setTimeout(function () {
      location.reload();
    }, 3000);
  };

  return (
    <>
      {/* FORM */}
      <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
        <Form {...form}>
          <h1 className="justify-center self-center text-2xl text-everyone tablet:mb-5 tablet:text-4xl">
            VIDEO EDITORS BONUS SHEET
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
              {/* How many ads did you make with the competitors ad as a basis?
              (If you did 1 product, you made 12 ads) ((fill in 0 if you didnt
              do anything)) */}
              <FormField
                control={form.control}
                name="competitorAdsBasis"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many ads did you make with the competitors ad as a
                      basis?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter number here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* // How many new scrollstoppers did you create for an existing ad?
              ((fill in 0 if you didnt do anything)) */}
              <FormField
                control={form.control}
                name="newScrollstoppers"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many new scrollstoppers did you create for an existing
                      ad?
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
              {/* // How many image ads did you create? (fill in 0 if you didnt do anything) */}
              <FormField
                control={form.control}
                name="imageAds"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many image ads did you create?
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

              {/* // How many VSL's did you make? ((fill in 0 if you didnt do
              anything)) */}
              <FormField
                control={form.control}
                name="vsl"
                render={({ field }) => (
                  <FormItem className="rounded-md border-none bg-discord_left px-8 py-5">
                    <FormLabel className="text-lg">
                      How many VSL&apos;s did you make?
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
