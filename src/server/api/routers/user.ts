import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { ROLE } from "@prisma/client";
import { UpdateProfileSchema } from "~/app/utils/zodHelpers";

export const userRouter = createTRPCRouter({
  getAllMembers: publicProcedure
    .input(z.object({ notMyTeam: z.nativeEnum(ROLE).optional(), myTeam: z.nativeEnum(ROLE).optional(), hasBonus: z.boolean().optional() }))
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

          input.hasBonus && {
            role: {
              in: ["VIDEO_EDITOR", "FUNNEL_BUILDER", "CUSTOMER_SERVICE", "CEO"]

            }
          }
        ].filter(Boolean)
      }

      const filterQuery = roleObj.OR.length === 0 ? {} : roleObj;

      return ctx.db.user.findMany({
        where: {
          ...(roleObj.OR === null ? {} : filterQuery)
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
});
