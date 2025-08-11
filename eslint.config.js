import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    // Global ignores and top-level settings
    ignores: [
      'lib/**/*',
      'package/**/*',
      'tests/generated/**/*',
      'node_modules/**/*',
      'coverage/**/*',
      '*.config.js',
      'vitest.config.js',
      'eslint.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  eslintPluginPrettierRecommended, // Global settings for all TypeScript files
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: ['tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
