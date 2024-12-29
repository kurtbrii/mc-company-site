import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

import { z } from "zod";
import { CustomerServiceSchema, FacebookMarketingSchema, FunnelBuildersSchema, ManagerSchema, VideoEditorsBonusSchema } from "~/app/utils/zodHelpers";


export const bonusSheetRouter = createTRPCRouter({
  // ! manager bonus
  createManagerBonus: protectedProcedure
    .input(ManagerSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.managerBonus.create({
        data: {
          dateOfWork: input.dateOfWork,

          hoursWorked: input.hoursWorked,
          funnelsCreated: input.funnelsCreated,
          copyFunnelTrick: input.copyFunnelTrick,
          advertorialFromScratch: input.advertorialFromScratch,
          funnelsImported: input.funnelsImported,

          hoursAsCustomerService: input.hoursAsCustomerService,
          ticketResolved: input.ticketResolved,
          disputesAnswered: input.disputesAnswered,

          productivity: input.productivity,
          userId: input.userId
        }
      });
    }),

  getManagerBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.managerBonus.findMany({
        where: {
          userId: input.userId,
          dateOfWork: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),

  // ! video editor bonus 
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
          dateOfWork: input.dateOfWork,
          videoAdsFromScratch: input.videoAdsFromScratch,
          productivity: input.productivity,
        },
      });
    }),

  getVideoEditorBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.videoEditorsBonus.findMany({
        where: {
          userId: input.userId,
          dateOfWork: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),


  deleteVideoEditorBonus: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.videoEditorsBonus.delete({
        where: {
          id: input.id
        }
      })
    }),

  // ! funnel builder bonus
  createFunnelBuildersBonus: protectedProcedure
    .input(FunnelBuildersSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.funnelBuildersBonus.create({
        data: {
          hoursWorked: input.hoursWorked,
          funnelsCreated: input.funnelsCreated,
          copyFunnelTrick: input.copyFunnelTrick,
          advertorialFromScratch: input.advertorialFromScratch,
          userId: input.userId,
          dateOfWork: input.dateOfWork,
          productivity: input.productivity,
          funnelsImported: input.funnelsImported
          // hoursAsCustomerService: input.hoursAsCustomerService,
          // ticketResolved: input.ticketResolved,
          // disputesAnswered: input.disputesAnswered,
        }
      })
    }),


  getFunnelBuilderBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.funnelBuildersBonus.findMany({
        where: {
          userId: input.userId,
          dateOfWork: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),

  deleteFbBonus: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.funnelBuildersBonus.delete({
        where: {
          id: input.id
        }
      })
    }),


  // ! customer service bonus
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
          productivity: input.productivity
        }
      })
    }),


  getCustomerServiceBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.customerServiceBonus.findMany({
        where: {
          userId: input.userId,
          dateOfWork: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),

  deleteCsBonus: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customerServiceBonus.delete({
        where: {
          id: input.id
        }
      })
    }),

  // ! facebook marketing bonus
  createFBMarketingBonus: protectedProcedure
    .input(FacebookMarketingSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.facebookMarketingBonus.create({
        data: {
          userId: input.userId,
          campaignsLaunched: input.campaignsLaunched,
          dateOfWork: input.dateOfWork,
          hoursCampaignsLaunched: input.hoursCampaignsLaunched,
          productivity: input.productivity
        }
      })
    }),

  getFBMarketingBonus: protectedProcedure
    .input(z.object({ userId: z.string(), startDate: z.date().optional(), endDate: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.facebookMarketingBonus.findMany({
        where: {
          userId: input.userId,
          dateOfWork: {
            gte: input.startDate,
            lte: input.endDate
          }
        },
        orderBy: {
          dateOfWork: "desc"
        }
      })
    }),

  deleteFbMarketingBonus: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.facebookMarketingBonus.delete({
        where: {
          id: input.id
        }
      })
    })
});


