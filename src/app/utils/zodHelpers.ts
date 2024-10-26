import { z, ZodType } from "zod";
import { ROLE } from "@prisma/client";

// user.ts
export const UpdateProfileSchema = z.object({
  id: z.string(),
  fullName: z.string().optional(),
  role: z.nativeEnum(ROLE).optional(),
  currentTimeInId: z.string().optional()
});

// timeIn.ts
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
