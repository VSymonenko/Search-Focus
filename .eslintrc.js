/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@figma/figma-plugins/recommended',
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
  },
}
