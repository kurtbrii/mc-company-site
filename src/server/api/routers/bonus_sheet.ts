import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { VideoEditorsBonusSchema } from "~/app/utils/zodHelpers";

export const bonusSheetRouter = createTRPCRouter({
  getAllVideoEditorsBonus: protectedProcedure
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



  createVideoEditorsBonus: protectedProcedure
    .input(VideoEditorsBonusSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.videoEditorsBonus.create({
        data: {
          hoursWorked: input.hoursWorked,
          competitorAdsBasis: input.competitorAdsBasis,
          newScrollstoppers: input.newScrollstoppers,
          imageAds: input.imageAds,
          vsl: input.vsl,
          userId: input.userId
        },
      });
    }),
});


