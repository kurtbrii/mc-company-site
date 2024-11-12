import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { VideoEditorsBonusSchema, FunnelBuildersSchema, CustomerServiceSchema } from "~/app/utils/zodHelpers";


export const bonusSheetRouter = createTRPCRouter({
  // ! create functions
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
          userId: input.userId,
          dateOfWork: input.dateOfWork
        },
      });
    }),

  createFunnelBuildersBonus: protectedProcedure
    .input(FunnelBuildersSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.funnelBuildersBonus.create({
        data: {
          hoursWorked: input.hoursWorked,
          funnelsCreated: input.funnelsCreated,
          copyFunnelTrick: input.copyFunnelTrick,
          advertorialFromScratch: input.advertorialFromScratch,
          hoursAsCustomerService: input.hoursAsCustomerService,
          ticketResolved: input.ticketResolved,
          disputesAnswered: input.disputesAnswered,
          userId: input.userId,
          dateOfWork: input.dateOfWork
        }
      })
    }),

  createCustomerServiceBonus: protectedProcedure
    .input(CustomerServiceSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customerServiceBonus.create({
        data: {
          hoursWorked: input.hoursWorked,
          ticketsResolved: input.ticketsResolved,
          disputesResolved: input.disputesResolved,
          dateOfWork: input.dateOfWork,
          userId: input.userId,
        }
      })
    }),

  // ! get functions
  getVideoEditorBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.videoEditorsBonus.findMany({
        where: {
          userId: input.userId,
          date: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),


  getCustomerServiceBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.customerServiceBonus.findMany({
        where: {
          userId: input.userId,
          date: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),

  getFunnelBuilderBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.funnelBuildersBonus.findMany({
        where: {
          userId: input.userId,
          date: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),



});


