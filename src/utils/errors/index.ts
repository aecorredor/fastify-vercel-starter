/**
 * Used in switch statements for exhaustiveness.
 *
 * @param unreachableSubject
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertUnreachable = (unreachableSubject: never): never => {
  throw new Error("Didn't expect to get here");
};
