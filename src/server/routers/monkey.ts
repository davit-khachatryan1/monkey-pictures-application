import { z } from 'zod';
import { prisma } from '../prisma';
import { router, publicProcedure } from '../trpc';

const listSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(2),
});

const createSchema = z.object({
  description: z.string().min(3).max(2000),
  url: z.string().min(3).max(500),
});

const deleteSchema = z.object({
  id: z.number(),
});

export const monkeyRouter = router({
  list: publicProcedure
    .input(listSchema)
    .query(async ({ input }) => {
      const { page, limit } = input;
      const monkeys = await prisma.monkey.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
      const totalCount = await prisma.monkey.count();
      const hasNextPage = page * limit < totalCount;
      return { monkeys, hasNextPage };
    }),
  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ input }) => {
      const { description, url } = input;
      const monkey = await prisma.monkey.create({
        data: { description, url },
      });
      return monkey;
    }),
  delete: publicProcedure
    .input(deleteSchema)
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.monkey.delete({
        where: { id },
      });
      return { success: true };
    }),
});
