import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'build', '.expo', 'babel.config.js']
  },
  // Global settings
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Use compat to include React plugin recommended configs in flat mode
  ...compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Allow require() for static image assets in React Native
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
);
