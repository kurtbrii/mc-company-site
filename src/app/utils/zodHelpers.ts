import { z, ZodType } from "zod";
import { ROLE } from "@prisma/client";


export const UpdateProfileSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1),
  role: z.nativeEnum(ROLE)
});
