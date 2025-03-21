const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/app/components/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
        '^@/models/(.*)$': '<rootDir>/models/$1',
        '^@/services/(.*)$': '<rootDir>/services/$1',
    },
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js',
    ],
    collectCoverageFrom: [
        'app/**/*.js',
        'lib/**/*.js',
        'models/**/*.js',
        'services/**/*.js',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
        },
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig) 