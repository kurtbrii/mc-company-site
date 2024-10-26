import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { UpdateProfileSchema } from "~/app/utils/zodHelpers";

export const userRouter = createTRPCRouter({
  editProfile: protectedProcedure
    .input(UpdateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          fullName: input.fullName,
          role: input.role,
          currentTimeInId: input.currentTimeInId
        },
        where: {
          id: input.id
        }
      });
    }),
});
