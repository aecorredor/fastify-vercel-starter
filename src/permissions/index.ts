import { allow, shield } from 'graphql-shield';
import { Rule, RuleFalse, RuleTrue } from 'graphql-shield/typings/rules';

// TODO: import actual generated reolvers.
// import { QueryResolvers, MutationResolvers } from '../generated/resolvers';
import * as rules from './rules';

type QueryResolvers = { exampleQuery: () => string };
type MutationResolvers = { exampleMutation: () => string };

export const getPermissions = (): ReturnType<typeof shield> => {
  const Query: Record<keyof QueryResolvers, Rule | RuleTrue | RuleFalse> = {
    exampleQuery: rules.isAuthenticated,
  };

  const Mutation: Record<keyof MutationResolvers, Rule | RuleTrue | RuleFalse> =
    {
      exampleMutation: allow,
    };

  return shield({
    Query,
    Mutation,
  });
};
