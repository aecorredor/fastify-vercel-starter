// import { FastifyRequest } from 'fastify';

import { Config, createConfig } from '../config';

export interface AppContext {
  config: Config;
}

export const buildContext = (): // req: FastifyRequest
Promise<AppContext> | AppContext => {
  const config = createConfig();

  return {
    config,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MercuriusContext extends PromiseType<AppContext> {}
}
