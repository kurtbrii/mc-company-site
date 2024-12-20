import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { ROLE } from "@prisma/client";
import { UpdateProfileSchema } from "~/app/utils/zodHelpers";
import { hasBonusObject } from '~/app/utils/helper'

export const userRouter = createTRPCRouter({
  getAllMembers: publicProcedure
    .input(z.object({ notMyTeam: z.nativeEnum(ROLE).optional(), myTeam: z.nativeEnum(ROLE).optional(), hasBonus: z.boolean().optional(), month: z.number().optional(), year: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const roleObj = {
        OR: [
          input.myTeam && {
            role: {
              equals: input.myTeam
            }
          },
          input.notMyTeam && {
            role: {
              not: input.notMyTeam
            }
          },

          // ! used in monthly survey
          input.month && input.year && {
            Survey: {
              none: {
                month: input.month,
                year: input.year
              }
            }
          }
        ].filter(Boolean),
        AND: [
          input.hasBonus && {
            role: {
              in: hasBonusObject
            }
          },
        ].filter(Boolean),
      }

      const filterQuery = roleObj.OR.length === 0 ? {} : roleObj;

      return ctx.db.user.findMany({
        where: {
          ...(roleObj.OR ?? roleObj.AND ? filterQuery : {})
        },
        orderBy: {
          fullName: 'asc'
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

  deleteTimeInId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          currentTimeInId: ""
        },
        where: {
          id: input.userId
        }
      })
    })
});
