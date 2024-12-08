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
import { VideoEditorsBonusSchema } from "../../utils/zodHelpers";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { FormFieldComponent } from "./form_field_components/videoEditorFormField";

function calculateProductivity(data: z.infer<typeof VideoEditorsBonusSchema>) {
  return (
    (data.competitorAdsBasis * 0.2 +
      data.newScrollstoppers * 0.1 +
      data.imageAds +
      data.vsl * 1.33) /
    data.hoursWorked
  );
}

export default function VideoEditorsBonus() {
  const { data: session } = useSession();
  const userId = session?.user.id ?? "";

  const { toast } = useToast();

  const submitVideoEditorsForm =
    api.bonusSheet.createVideoEditorsBonus.useMutation({
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
  type VideoEditorsBonusSchemaType = z.infer<typeof VideoEditorsBonusSchema>;

  const form = useForm<VideoEditorsBonusSchemaType>({
    defaultValues: {
      hoursWorked: undefined,
      competitorAdsBasis: undefined,
      imageAds: undefined,
      newScrollstoppers: undefined,
      vsl: undefined,
      userId: userId ?? "",
      productivity: 0,
    },
    resolver: zodResolver(VideoEditorsBonusSchema),
  });

  //! Submit Form
  const onSubmit = async (data: z.infer<typeof VideoEditorsBonusSchema>) => {
    const productivity = calculateProductivity(data);

    await submitVideoEditorsForm.mutateAsync({
      userId: userId,
      competitorAdsBasis: data.competitorAdsBasis,
      hoursWorked: data.hoursWorked,
      imageAds: data.imageAds,
      newScrollstoppers: data.newScrollstoppers,
      vsl: data.vsl,
      dateOfWork: data.dateOfWork,
      productivity: productivity,
    });
  };

  return (
    <>
      {/* FORM */}
      <div className="flex w-screen flex-col items-center justify-center tablet:my-12">
        <Form {...form}>
          <h1 className="justify-center self-center rounded-xl bg-video_editor_bg p-4 text-2xl text-video_editor tablet:mb-5 tablet:text-4xl">
            VIDEO EDITORS BONUS SHEET
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

              <FormFieldComponent
                form={form}
                label={
                  "How many ads did you make with the competitors ad as a basis?"
                }
                controlName="competitorAdsBasis"
              />

              <FormFieldComponent
                form={form}
                label={
                  "How many new scrollstoppers did you create for an existing ad? "
                }
                controlName="newScrollstoppers"
              />

              <FormFieldComponent
                form={form}
                label={"How many image ads did you create?"}
                controlName="imageAds"
              />

              <FormFieldComponent
                form={form}
                label={"How many VSL's did you make?"}
                controlName="vsl"
              />

              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={form.formState.isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
