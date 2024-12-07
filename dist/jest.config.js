"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var presets_1 = require("ts-jest/presets");
var jestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>'],
    transform: __assign({}, presets_1.defaults.transform),
    testMatch: ['<rootDir>/**/*.test.ts'],
    modulePaths: ['<rootDir>/src'],
    moduleNameMapper: {
        '^@/(.+)': '<rootDir>/src/$1',
        '^@test/(.+)': '<rootDir>/test/$1',
    },
    moduleDirectories: ['node_modules', '<rootDir>'],
};
exports.default = jestConfig;
