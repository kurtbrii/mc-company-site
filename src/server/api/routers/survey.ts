import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { SurveySchema } from "~/app/utils/zodHelpers";

export const surveyRouter = createTRPCRouter({
  getAllSurvey: protectedProcedure
    .input(z.object({ month: z.number().optional(), year: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.survey.findMany({
        where: {
          month: input.month,
          year: input.year,
        },
        include: {
          User: true
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

});

