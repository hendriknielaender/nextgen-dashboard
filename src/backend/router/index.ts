import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';

const appRouter = trpc.router().query('getUser', {
  input: z.string(),
  async resolve(req) {
    req.input; // string
    return { id: req.input, name: 'Bilbo' };
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
