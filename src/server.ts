import Fastify, { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import { join } from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { addResolversToSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';

import { loadSchema } from './utils/graphql';
import resolvers from './resolvers';
import { buildContext } from './context';
// import { getPermissions } from './permissions';

const getSchemaWithMiddleware = (schema: ReturnType<typeof loadSchema>) => {
  const mergedResolvers = mergeResolvers(resolvers);
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: mergedResolvers,
  });
  const schemaWithMiddleware = applyMiddleware(
    schemaWithResolvers
    // TODO: add permissions back in when query/mutation resolvers are added.
    // getPermissions()
  );

  return schemaWithMiddleware;
};

export const createApp = (): FastifyInstance => {
  const app = Fastify({
    logger: true,
  });

  const schema = loadSchema(join(__dirname, './schemas/schema.graphql'));

  void app.register(mercurius, {
    context: buildContext,
    graphiql: true,
    schema: getSchemaWithMiddleware(schema),
  });

  return app;
};

export const createTestApp = (): FastifyInstance => {
  const app = Fastify({
    logger: true,
  });

  const schema = loadSchema(join(__dirname, './schemas/schema.graphql'));

  void app.register(mercurius, {
    schema: getSchemaWithMiddleware(schema),
    context: async () => {
      const context = await buildContext();

      return context;
    },
    graphiql: false,
  });

  return app;
};
