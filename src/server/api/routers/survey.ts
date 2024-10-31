import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { SurveySchema } from "~/app/utils/zodHelpers";

export const timeInRouter = createTRPCRouter({
  getAllSurvey: protectedProcedure
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
    .input(SurveySchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.survey.create({
        data: {
          feelBetter: input.feelBetter,
          stillHappy: input.stillHappy,
          motivated: input.motivated,
          comments: input.comments,
          userId: input.userId
        },
      });
    }),

  // timeOut: protectedProcedure
  //   .input(TimeOutSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.timeInDetails.update({
  //       data: {
  //         timeOutDescription: input.timeOutDescription,
  //         timeOut: input.timeOut
  //       },
  //       where: {
  //         id: input.id
  //       }
  //     })
  // })
});

