import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { SurveySchema } from "~/app/utils/zodHelpers";

export const surveyRouter = createTRPCRouter({
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



  createSurvey: protectedProcedure
    .input(SurveySchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.survey.create({
        data: {
          feelBetter: input.feelBetter,
          stillHappy: input.stillHappy,
          listenedTo: input.listenedTo,
          motivated: input.motivated,
          comments: input.comments,
          userId: input.userId,
          month: input.month,
          year: input.year
        },
      });
    }),

  getOneSurvey: protectedProcedure
    .input(z.object({ userId: z.string(), month: z.number(), year: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.survey.findUnique({
        where: {
          userId_month_year: {
            userId: input.userId,
            month: input.month,
            year: input.year
          }
        }
      })
    })

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

