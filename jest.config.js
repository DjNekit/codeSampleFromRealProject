module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(j|t)sx?$": "babel-jest"
    },
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
        "^@globalActions$": "<rootDir>/src/redux/globalActions.ts",
        "^test-utils$": "<rootDir>/src/test/test-utils.tsx",
    },
    setupFilesAfterEnv: [
        "<rootDir>/src/test/setup.ts"
    ]
}