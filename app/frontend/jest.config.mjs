import nextJest from 'next/jest.js';
import babelConfig from './babel.test.config.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/test-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/../test/$1',
  },
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        babelConfig,
      },
    ],
    '\\.[jt]s?$': [
      'babel-jest',
      {
        babelConfig,
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(cliui)/)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
