import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

/**
 * Loads a GraphQL schema from a given path.
 * @param path
 *
 */
export const loadSchema = (path: string): ReturnType<typeof loadSchemaSync> => {
  return loadSchemaSync(path, {
    loaders: [new GraphQLFileLoader()],
  });
};
