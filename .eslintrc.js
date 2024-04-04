/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@figma/figma-plugins/recommended',
    'plugin:functional/external-typescript-recommended',
    'plugin:functional/stylistic',
    'plugin:functional/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true,
  ignorePatterns: ['*.d.ts'],
  rules: {
    'max-len': ['error', { code: 85 }],
    'no-shadow': 'error',
    'functional/no-expression-statements': ['error', { ignoreVoid: true }],
    'functional/functional-parameters': ['error', { enforceParameterCount: false }],
  },
  plugins: ['functional']
}
