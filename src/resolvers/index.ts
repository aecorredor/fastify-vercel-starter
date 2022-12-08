export default [
  {
    Query: {
      hello: () => ({
        hello: 'hello',
      }),
    },
    Mutation: {
      world: () => ({
        world: 'world',
      }),
    },
  },
];
