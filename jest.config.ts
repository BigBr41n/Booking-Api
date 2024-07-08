import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
