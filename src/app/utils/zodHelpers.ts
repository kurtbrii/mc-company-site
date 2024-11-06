import { z, ZodType } from "zod";
import { ROLE, MOTIVATED, YES_NO, YES_NO_SAME } from "@prisma/client";

// ! user.ts
export const UpdateProfileSchema = z.object({
  id: z.string(),
  fullName: z.string().optional(),
  role: z.nativeEnum(ROLE).optional(),
  currentTimeInId: z.string().optional()
});

// ! timeIn.ts
export const TimeInSchema = z.object({
  timeInDescription: z
    .string()
    .min(5, { message: "Time in details must be at least 5 characters" })
    .max(40, { message: "Time in details must be at most 40 characters" }),
  userId: z.string()
})

export const TimeOutSchema = z.object({
  timeOutDescription: z
    .string()
    .min(5, { message: "Time out details must be at least 5 characters" })
    .max(40, { message: "Time out details must be at most 40 characters" }),
  timeOut: z.date(),
  id: z.string()
})

// ! survey.ts
export const SurveySchema = z.object({
  feelBetter: z.nativeEnum(YES_NO_SAME).optional(),
  stillHappy: z.nativeEnum(YES_NO).optional(),
  listenedTo: z.nativeEnum(YES_NO).optional(),
  motivated: z.nativeEnum(MOTIVATED).optional(),
  comments: z.string().optional(),
  userId: z.string(),
  month: z.number()



})

// ! bonus_sheet.ts
export const VideoEditorsBonusSchema = z.object({
  hoursWorked: z.coerce.number({ message: "This should be a number" }),
  competitorAdsBasis: z.coerce.number({ message: "This should be a number" }),
  newScrollstoppers: z.coerce.number({ message: "This should be a number" }),
  imageAds: z.coerce.number({ message: "This should be a number" }),
  vsl: z.coerce.number({ message: "This should be a number" }),
  userId: z.string()
})