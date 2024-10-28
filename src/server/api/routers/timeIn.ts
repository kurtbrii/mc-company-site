import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";

import { TimeInSchema, TimeOutSchema } from "~/app/utils/zodHelpers";

export const timeInRouter = createTRPCRouter({
  getAllTimeIn: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.timeInDetails.findMany({
        where: {
          userId: input.userId
        }
      })
    }),


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
