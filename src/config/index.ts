import { hasPath, path, mergeDeepRight } from 'ramda';

import defaultConfig from './default';
import local from './local';

const configByStage = {
  local,
};

export interface Config {
  get<T = string>(propertyPath: string): T;
  has(propertyPath: string): boolean;
}

type Stage = keyof typeof configByStage;

export const isProd = (): boolean => process.env.STAGE === 'prod';

const isStage = (maybeStage: unknown): maybeStage is Stage => {
  switch (maybeStage) {
    case 'local':
    case 'dev':
    case 'prod':
      return true;

    default:
      return false;
  }
};

export const createConfig = (): Config => {
  const stage = process.env.STAGE;

  if (!isStage(stage)) throw Error('invalid stage');

  const stageConfig = configByStage[stage] ?? {};
  const config = mergeDeepRight(defaultConfig, stageConfig);

  return {
    get<T = string>(propertyPath: string) {
      const parsedPath = propertyPath.split('.');

      if (!hasPath(parsedPath, config)) {
        throw new Error(`No config value at ${propertyPath}`);
      }

      return path(parsedPath, config) as T;
    },
    has(propertyPath: string) {
      return hasPath(propertyPath.split('.'), config);
    },
  };
};
