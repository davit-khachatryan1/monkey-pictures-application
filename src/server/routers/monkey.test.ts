import { describe, it, expect, vi, beforeEach } from 'vitest';
import { monkeyRouter } from '../routers/monkey';
import { inferProcedureInput } from '@trpc/server';
import { createContext } from '../context';
import { prisma } from '../prisma';

vi.mock('../prisma', () => ({
  prisma: {
    monkey: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('monkeyRouter', () => {
  let ctx: ReturnType<typeof createContext>;

  beforeEach(() => {
    ctx = createContext({ prisma });
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should return a list of monkeys with pagination', async () => {
      const mockMonkeys = [{ id: 1, description: 'Monkey 1', url: 'url1' }];
      prisma.monkey.findMany.mockResolvedValue(mockMonkeys);
      prisma.monkey.count.mockResolvedValue(10);

      const input: inferProcedureInput<typeof monkeyRouter['list']> = { page: 1, limit: 2 };
      const result = await monkeyRouter.createCaller(ctx).list(input);

      expect(result.monkeys).toEqual(mockMonkeys);
      expect(result.hasNextPage).toBe(true);
      expect(prisma.monkey.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 2,
      });
      expect(prisma.monkey.count).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new monkey', async () => {
      const newMonkey = { id: 1, description: 'New Monkey', url: 'new_url' };
      prisma.monkey.create.mockResolvedValue(newMonkey);

      const input: inferProcedureInput<typeof monkeyRouter['create']> = { description: 'New Monkey', url: 'new_url' };
      const result = await monkeyRouter.createCaller(ctx).create(input);

      expect(result).toEqual(newMonkey);
      expect(prisma.monkey.create).toHaveBeenCalledWith({
        data: { description: 'New Monkey', url: 'new_url' },
      });
    });
  });

  describe('delete', () => {
    it('should delete a monkey by id', async () => {
      prisma.monkey.delete.mockResolvedValue({});

      const input: inferProcedureInput<typeof monkeyRouter['delete']> = { id: 1 };
      const result = await monkeyRouter.createCaller(ctx).delete(input);

      expect(result).toEqual({ success: true });
      expect(prisma.monkey.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
