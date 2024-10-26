import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { TimeInSchema, TimeOutSchema } from "~/app/utils/zodHelpers";

export const timeInRouter = createTRPCRouter({
  timeIn: protectedProcedure
    .input(TimeInSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.timeInDetails.create({
        data: {
          timeInDescription: input.timeInDescription,
          userId: input.userId
        },
      });
    }),

  timeOut: protectedProcedure
    .input(TimeOutSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.timeInDetails.update({
        data: {
          timeOutDescription: input.timeOutDescription,
          timeOut: input.timeOut
        },
        where: {
          id: input.id
        }
      })
    })
});
