import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

const appRouter = trpc
  .router()
  .query('allTodos', {
    resolve: () => prisma.todo.findMany(),
  })
  .query('infiniteTodos', {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
    }),
    async resolve({ input }) {
      console.log({ input });
      //const limit = input.limit ?? 50;
      const limit = 10;
      const { cursor } = input;
      const items = await prisma.todo.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'asc',
        },
      });

      console.log({ items });

      let nextCursor: typeof cursor | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    },
  });
//.mutation('createUser', {
// validate input with Zod
//input: z.object({ name: z.string().min(5) }),
//async resolve(req) {
// use your ORM of choice
//return await UserModel.create({
//  data: req.input,
//});
//},
//});

export type AppRouter = typeof appRouter;

async function main() {
  const app = express();

  // enabling CORS
  app.use(cors());

  // created for each request
  const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
  type Context = trpc.inferAsyncReturnType<typeof createContext>;

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ? req.body : req.query);

    next();
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.listen(3001, () => {
    console.log('listening on port 3001');
  });
}

main();
