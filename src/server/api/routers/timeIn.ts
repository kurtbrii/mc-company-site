import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";

import { TimeInSchema, TimeOutSchema } from "~/app/utils/zodHelpers";

export const timeInRouter = createTRPCRouter({
  getAllTimeIn: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.timeInDetails.findMany({
        where: {
          userId: input.userId,
          timeIn: {
            gte: input.startDate,
            lte: input.endDate
          }
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
