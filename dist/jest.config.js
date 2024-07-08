"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
exports.default = config;
