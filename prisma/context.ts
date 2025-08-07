import { PrismaClient } from '@prisma/client';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const prisma = new PrismaClient();
  return {
    prisma,
    user: null,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
