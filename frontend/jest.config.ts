// jest.config.js
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next-auth/react$': '<rootDir>/node_modules/next-auth/react',
  },
};

module.exports = createJestConfig(customJestConfig);
