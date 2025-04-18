export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
  };