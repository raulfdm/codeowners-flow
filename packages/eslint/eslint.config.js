import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['dist/**/*', 'node_modules/**/*', '.turbo/**/*', 'coverage/**/*'],
  },
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.plugins('@typescript-eslint', 'simple-import-sort'),
  {
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.ts',
      '**/*.tsx',
    ],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['**/*.test.*', '**/*.spec.*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
