import { rule } from 'graphql-shield';
// import { MercuriusContext } from 'mercurius';

export const isAuthenticated = rule({ cache: 'contextual' })(
  // (parent, args, ctx: MercuriusContext)
  () => {
    return true;
  }
);
