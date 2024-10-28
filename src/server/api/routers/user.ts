import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { UpdateProfileSchema } from "~/app/utils/zodHelpers";

export const userRouter = createTRPCRouter({
  getAllMembers: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          id: input.id
        }
      })
    }),

  getMember: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id
        }
      })
    }),

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
