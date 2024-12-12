// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImport from 'eslint-plugin-unused-imports';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  ignores: ['dist/**/*', 'node_modules/*', '**/*.js'],
  files: ['**/*.ts', '**/*.js'],
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImport
  },
  extends: [
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic
  ],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    quotes: ['error', 'single'],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // External libraries and side effects
          ['^@?\\w', '^\\u0000'],
          // Relative paths up to 3 levels
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)'
          ],
          // Catch-all group for anything else
          ['^']
        ]
      }
    ],
    // #region  //*=========== Unused Import ===========
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
    // #endregion  // *======== Unused Import ===========
  }
});
